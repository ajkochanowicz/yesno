// Most of this is a dupe of issue_single.js.jsx, but it has a slightly different purpose.
// Would be good to DRY up.

var OpinionSingle = React.createClass({
  getInitialState: function() {
    return {
      issue: {
        id: 0,
        name: "Loading...",
        description: "",
        created_at: "",
        victor_score: 0,
        score: 0,
        yes: 0,
        no: 0,
        opinions: []
      },
      opinion: {
        id: 0,
        score: 0,
        handle: '',
        avatar: '',
        statement: '',
        agree: false,
        created_at: '',
        comments: 0,
        slug: ''
      }
    }
  },
  componentDidMount: function() {
    this.getData();
    $YN.mixpanel("Page visited", {
      page: "Opinion page – " + this.state.issue.name + " | " + this.state.opinion.statement
    });
  },
  getIssueData: function() {
    var self = this,
      state = this.state;
    $YN.get('/issues/' + k$.$('[data-issue-id]').dataset.issueId + '.json', function(data) {
      state.issue = data.issue;
      self.setState(state);
    });
  },
  getOpinionData: function() {
    var self = this,
      state = this.state;
    $YN.get('/issues/' + k$.$('[data-issue-id]').dataset.issueId + '/opinions/' + k$.$('[data-opinion-id]').dataset.opinionId + '.json', function(data) {
      state.opinion = data.opinion;
      self.setState(state);
    });
  },
  getData: function() {
    this.getIssueData();
    this.getOpinionData();
  },
  render: function() {
    return (
      <div className="row">
        <IssueCard issue={this.state.issue} getData={this.getData} />
        <div className="opinion_column">
          <p><a href={ "/issues/" + this.state.issue.id }>{ "Back to " + this.state.issue.name }</a></p>
          <figure data-component="opinion_preview">
            <img src={ this.state.opinion.avatar } />
            <article>
              <h1>
                <span className={"verdict " + (this.state.opinion.agree ? "yes" : "no")}>{ this.state.opinion.agree ? "YES" : "NO" }</span>
                <span>{"@" + this.state.opinion.handle }</span>
              </h1>
              <p>{ this.state.opinion.statement }</p>
            </article>
          </figure>
          <Commenter />
        </div>
      </div>
    )
  }
});
