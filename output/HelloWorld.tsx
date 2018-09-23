import React from "react";
import { connect } from "react-redux";

interface Props {
  
}

interface State {
  
}

class HelloWorld extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      
    };
  }

  public render() {
    return (
      <div>
        <p>hello world</p>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({
  
});

export default connect(mapStateToProps)(HelloWorld);
