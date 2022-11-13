const CreateAddItems = ({tasks,handleDoubleClick,handleDelete}) => {
    return (
        <>
            <div className='add-items'>
                {tasks.map((task) => {
                    return (
                        <div className='to-do-item' key={task.id}>
                            <span className='name' style={task.completed ? { textDecoration: 'line-through' } : null} onDoubleClick={() => handleDoubleClick(task.id)}>{task.todo}</span>
                            <div className='actions'>
                                <span><button onClick={() => handleDelete(task.id)}>Delete</button></span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default CreateAddItems;