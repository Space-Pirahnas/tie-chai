import React, { PropTypes } from 'react';
import SurveyFirstPage from './surveyFirstPage.jsx';
import SurveySecondPage from './surveySecondPage.jsx';

class Survey extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    const progressValue = page === 1 ? "50" : "100";
    return (
      <div>
        <div className="progress">
          <div className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar" aria-valuenow={progressValue} aria-valuemin="0" aria-valuemax="100"
            style={{ "width": `${progressValue}%` }}>
            <span className="sr-only">`${progressValue}%` Complete</span>
          </div>
        </div>
        {page === 1 && <SurveyFirstPage onSubmit={this.nextPage} />}
        {page === 2 && <SurveySecondPage previousPage={this.previousPage} onSubmit={onSubmit} />}
      </div>
    )
  }
}

Survey.PropTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Survey