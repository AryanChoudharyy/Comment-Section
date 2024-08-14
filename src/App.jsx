import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import CommentsSection from "./components/CommentsSection";
import "./styles/App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CommentsSection />
      </div>
    </Provider>
  );
}

export default App;
