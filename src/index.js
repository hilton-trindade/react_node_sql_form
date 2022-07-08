import React from "react";
import Component from './component.js'
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import updateAction from "./actions";


class App extends Component {

  state = {
    products: []
}

componentDidMount() {
  this.getFeedbacks();
}

getFeedbacks = _ => {
  fetch('http://localhost:4000/feedbacks')
  .then(response => response.json())
  .then(response => this.setState({ feedbacks: response.data }))
  .catch(err => console.error(err))
}

renderFeedback = ({ feedback_id, name }) => <div key={feedback_id}>{name}</div>

render() {
  const { feedbacks } = this.state;
  return (
    <div className="App">
      {feedbacks.map(this.renderFeedback)}
    </div>
  );
}
}

/* import "./styles.css";

export default function App(props) {
  const { register, handleSubmit, setValue } = useForm();
  // Submit your data into Redux store
  const onSubmit = data => props.updateAction(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("firstName")} defaultValue={props.firstName} />
      <Input {...register("lastName")} defaultValue={props.lastName} />
      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// Connect your component with redux
connect(({ firstName, lastName }) => ({ firstName, lastName }), updateAction)(YourForm);
 */