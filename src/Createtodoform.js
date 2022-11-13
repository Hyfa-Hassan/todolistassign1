const Createtodoform = ({handleSubmit,handleChange,taskInp}) => {
    return (
        <>
            <div className='to-do-form'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder='Enter task' onChange={(e) => handleChange(e)} value={taskInp} />
                    <button type='submit'>Add</button>
                </form>
            </div>
        </>
    )
}
export default Createtodoform;