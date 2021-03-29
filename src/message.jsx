import "./message.css";

function Message(props) {
  let date = new Date(props.message.created);
  let hour = (date.getHours() >= 10) ? date.getHours() : "0" + date.getHours();
  let min = (date.getMinutes() >= 10) ? date.getMinutes() : "0" + date.getMinutes();
  let time = hour + ":" + min;
  let myMsg = localStorage.username = props.message.name;

  return (
    <div className="message">
      <div className={myMsg ? "my-message": "other-message"}>
        <h3>{myMsg ? "Me": props.message.name}</h3>
        <p>{props.message.message}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default Message;