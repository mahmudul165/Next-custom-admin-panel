import React, { Component } from "react";
import Swal from "sweetalert2";

export default class AlertWarning extends Component {
  constructor() {
    super();
    this.HandleClick = this.HandleClick.bind(this);
  }

  HandleClick() {
    Swal.fire({
      ...this.props,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      onOpen: () => {
        // code
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-warning" onClick="{this.HandleClick}">
          Show Warning Alert
        </button>
      </div>
    );
  }
}
