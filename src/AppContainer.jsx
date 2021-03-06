import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import App from './App'

import {
  // startPath,
  // createAPath,
  // observePath,
  createPath
} from './Utils/MPGAAstar'

let xStart = 0
let yStart = 0

class AppContainer extends Component {
  constructor(props) {
    super(props)
  }

  mouseDown = event => {
    xStart = event.clientX
    yStart = event.clientY
  };

  mouseUp = event => {
    if (event.target.className === 'state') {
      const xEnd = event.clientX
      const yEnd = event.clientY
      const xDiff = Math.abs(xStart - xEnd)
      const yDiff = Math.abs(yStart - yEnd)
      if (xDiff < yDiff) {
        this.props.createWall(xStart, yStart, xStart, yEnd)
      } else {
        this.props.createWall(xStart, yStart, xEnd, yStart)
      }
    }
  };
  dragStart = event => {
    const img = new Image()
    if (this.props.nodes[event.target.id] === this.props.start) {
      event.dataTransfer.setData('text/plain', 'start')
    } else if (this.props.nodes[event.target.id] === this.props.goal) {
      event.dataTransfer.setData('text/plain', 'goal')
    }
    event.dataTransfer.setDragImage(img, -99999, -99999)
  };

  dragEnter = event => {
    event.preventDefault()
    if (event.dataTransfer.getData('text/plain') === 'start') {
      if (event.target.className === 'state') {
        this.props.dragEnterStartNode(
          this.props.nodes,
          event.target.id,
          this.props.walls
        )
      }
    } else if (event.dataTransfer.getData('text/plain') === 'goal') {
      if (event.target.className === 'state') {
        this.props.dragEnterGoalNode(
          this.props.nodes,
          event.target.id,
          this.props.walls
        )
      }
    }
  };

  render() {
    return (
      <App
        length={this.props.length}
        height={this.props.height}
        walls={this.props.walls}
        nodes={this.props.nodes}
        edges={this.props.edges}
        start={this.props.start}
        goal={this.props.goal}
        path={this.props.path}
        allowDrop={this.allowDrop}
        dragStart={this.dragStart}
        dragEnter={this.dragEnter}
        dragOver={this.dragOver}
        drop={this.drop}
        mouseDown={this.mouseDown}
        mouseUp={this.mouseUp}
        startCreateWall={this.props.startCreateWall}
        endCreateWall={this.props.endCreateWall}
        createGraph={this.props.createGraph}
        startSearch={this.props.startSearch}
      />
    )
  }
}

AppContainer.propTypes = {
  length: PropTypes.number,
  height: PropTypes.number,
  walls: PropTypes.array,
  nodes: PropTypes.array,
  edges: PropTypes.array,
  start: PropTypes.object,
  goal: PropTypes.object,
  path: PropTypes.array,
  allowDrop: PropTypes.func.isRequired,
  dragStart: PropTypes.func.isRequired,
  dragEnter: PropTypes.func.isRequired,
  drop: PropTypes.func.isRequired,
  mouseDown: PropTypes.func.isRequired,
  mouseUp: PropTypes.func.isRequired,
  createGraph : PropTypes.func.isRequired,
  startSearch : PropTypes.func.isRequired,
  createWall : PropTypes.func.isRequired,
  startCreateWall : PropTypes.func.isRequired,
  endCreateWall : PropTypes.func.isRequired,
  dragEnterStartNode : PropTypes.func.isRequired,
  dragEnterGoalNode : PropTypes.func.isRequired
}

AppContainer.defaultProps = {
  length: 0,
  walls: [],
  nodes: [],
  edges: [],
  start: null,
  goal: null,
  path: []
}

export default connect(
  state => ({
    nodes: state.nodes,
    edges: state.edges,
    walls: state.walls,
    length: state.length,
    height: state.height,
    start: state.start,
    goal: state.goal,
    borders: state.borders,
    path: state.path,
    counter: state.counter
  }),
  dispatch => ({
    createGraph: (length, height) =>
      dispatch((dispatch, getState) => {
        let state = getState()
        dispatch({
          type: 'CREATE_NODES',
          length,
          height,
          proximity: 30,
          walls: state.walls
        })
        state = getState()
        dispatch({ type: 'CREATE_EDGES', nodes: state.nodes })
        state = getState()
        dispatch({ type: 'POPULATE_NODE_EDGES', edges: state.edges })
        state = getState()
        dispatch({ type: 'SET_MAP_SIZE', length, height })
        state = getState()
        dispatch({
          type: 'SET_BORDERS',
          length,
          height,
          proximity: 30
        })
        state = getState()
        dispatch({
          type: 'CREATE_MAP_BORDER',
          borders: state.borders,
          bufferSize: 30
        })
        dispatch({ type: 'SET_START', nodes: state.nodes })
        dispatch({ type: 'SET_GOAL', nodes: state.nodes })
      }),
    dragEnterStartNode: (nodes, id, walls) =>
      dispatch({
        type: 'DRAG_ENTER_START_NODE',
        nodes,
        id,
        walls
      }),
    dragEnterGoalNode: (nodes, id, walls) =>
      dispatch({
        type: 'DRAG_ENTER_GOAL_NODE',
        nodes,
        id,
        walls
      }),

    createWall: (x1, y1, x2, y2) =>
      dispatch({
        type: 'CREATE_WALL',
        x1,
        y1,
        x2,
        y2,
        bufferSize: 30
      }),

    startSearch: () =>
      dispatch((dispatch, getState) => {
        const {
          height,
          nodes,
          edges,
          walls,
          start,
          goal,
        } = getState()
        const path = createPath(
          height,
          30,
          nodes,
          edges,
          walls,
          start,
          goal,
          path
        )
        dispatch({
          type: 'CREATE_PATH',
          nodes,
          edges,
          walls,
          path
        })
      })
  })
)(AppContainer)
