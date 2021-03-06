import React from 'react'
import PropTypes from 'prop-types'

const Node = props => (
  <div
    id={props.id}
    className="state"
    draggable={props.start || props.goal ? 'true' : 'none'}
    onDragStart={props.dragStart}
    onDragEnter={props.dragEnter}
    onMouseDown={() => false}
    style={{
      position: 'absolute',
      left: props.left,
      top: props.top,
      display: 'block',
      float: 'left',
      width: '30px',
      height: '30px',
      background: props.start
        ? '#4fd24f'
        : props.goal
          ? '#ff2020'
          : props.path ? '#38eeff' : props.open ? '#42ff7f' : '#efe7e5',
      opacity: 0.8,
      borderStyle: 'dotted',
      borderWidth: '1px',
      userDrag: 'none',
      userSelect: 'none'
    }}
  />
)

Node.propTypes = {
  id        : PropTypes.number,
  left      : PropTypes.number,
  top       : PropTypes.number,
  path      : PropTypes.boolean,
  open      : PropTypes.boolean,
  start     : PropTypes.boolean,
  goal      : PropTypes.boolean,
  dragStart : PropTypes.func.isRequired,
  dragEnter : PropTypes.func.isRequired
}

export default Node
