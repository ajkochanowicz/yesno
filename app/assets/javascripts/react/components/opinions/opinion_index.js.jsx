var OpinionIndex = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  refresh: function() {
    this.props.getData();
  },
  render: function() {
    var self = this;
    var opinionRows = this.props.issue.opinions.map(function(row) {
      if (row.statement !== null) {
        return (
          <div key={row.id} data-component="opinion_preview">
            <Voter 
              endpoint="/issues/:issue_id/opinions/:opinion_id"
              endpointData={ [this.props.issue.id, row.id] }
              score={ row.score }
              editable={ true }
              refresh={ this.refresh }
              keyId={row.id}
            />
            <img src={ row.avatar } />
            <article>
              <h1>
                <span className={"verdict " + (row.agree ? "yes" : "no") }>{ row.agree ? "YES" : "NO" }</span> 
                <span>{"@" + row.handle}</span>
              </h1>
              <p>{row.statement}</p>
              <footer>
                <ul>
                  <li>
                    <a href={ this.props.issue.slug + "/opinions/" + row.slug } >
                      Add a comment
                    </a>
                  </li>
                  <li>
                    <a href={ this.props.issue.slug + "/opinions/" + row.slug } >
                      { row.comments + " comments" }
                    </a>
                  </li>
                  <li>
                    <a href={ this.props.issue.slug + "/opinions/" + row.slug } >
                      { row.created_at }
                    </a>
                  </li>
                </ul>
              </footer>
            </article>
          </div>
        )
      }
    }, this)
    return (
      <div data-component="opinion_column">
        { opinionRows }
      </div>
    )
  }
})
