import React from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import GridInput from './GridInput'
import StartMenu from './StartMenu'
import './App.css'

const App = props => (
  <div>
    <Grid
      length={props.length}
      height={props.height}
      walls={props.walls}
      nodes={props.nodes}
      edges={props.edges}
      start={props.start}
      goal={props.goal}
      path={props.path}
      allowDrop={props.allowDrop}
      dragStart={props.dragStart}
      dragEnter={props.dragEnter}
      drop={props.drop}
      mouseDown={props.mouseDown}
      mouseUp={props.mouseUp}
    />
    <GridInput createGraph={props.createGraph} />
    <StartMenu startSearch={props.startSearch} />
  </div>
)

App.propTypes = {
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
  startSearch : PropTypes.func.isRequired
}
export default App
