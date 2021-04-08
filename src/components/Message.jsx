
function Message({ message, username}) {
  let date = new Date(message.created);
  let hour = (date.getHours() >= 10) ? date.getHours() : "0" + date.getHours();
  let min = (date.getMinutes() >= 10) ? date.getMinutes() : "0" + date.getMinutes();
  let time = hour + ":" + min;
  let myMsg = username === message.name;

  return (
    <div className="message">
      <div className={myMsg ? "my-message": "other-message"}>
        <h3>{myMsg ? "Me": message.name}</h3>
        <p>{message.message}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default Message;