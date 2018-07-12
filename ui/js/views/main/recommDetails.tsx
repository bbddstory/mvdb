'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { toggleEditDetailsAct } from '../../actions/uiActions';
import { watchLaterAct, recommAct, commentAct, delCommentAct } from '../../actions/detailsActions';

interface IReduxProps extends React.Props<any> {
  loginState: any,
  dataState: any,
  uiState: any,
  watchLaterDispatch: any,
  recommDispatch: any,
  commentDispatch: any,
  delCommentDispatch: any,
  editDetailsDispatch: any
}

interface ICompProps extends React.Props<any> {
  // dataRef: any
}

class RecommDetails extends React.Component<IReduxProps & ICompProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      opts: false,
      recomm: false,
      title: '',
      comment: '',
      showComment: false
    }
  }

  toggleRecomm() {
    this.setState({ recomm: !this.state.recomm });
  }

  commentFocus() {
    this.setState({ showComment: true });
  }

  cancelComment() {
    this.setState({ title: '', comment: '', showComment: false });
  }

  titleChange(e: any) {
    this.setState({ title: e.target.value });
  }

  commentChange(e: any) {
    this.setState({ comment: e.target.value });
  }

  submitComment() {
    if (this.state.title && this.state.comment) {
      let t = new Date();
      this.props.commentDispatch({
        [t.getTime()]: {
          time: t.getFullYear() + '.' + (t.getMonth() + 1) + '.' + t.getDate(),
          title: this.state.title,
          txt: this.state.comment,
          user: this.props.loginState.user
        }
      });
      this.cancelComment();
    }
  }

  friends = (vid: string) => {
    const { loginState } = this.props;
    let friends = [];

    for (let i = 0; i < loginState.friends.length; i++) {
      friends.push(
        <li key={i} onClick={e => this.props.recommDispatch(vid, loginState.friends[i].email)}>
          {loginState.friends[i].name}&nbsp;(<span>{loginState.friends[i].email}</span>)
        </li>
      )
    }

    return friends;
  }

  render() {
    const { loginState, dataState, uiState } = this.props;
    const key = this.props.dataState.key;
    const { opts, recomm, showComment } = this.state;
    const item = this.props.dataState.recommDetails;

    if (dataState.recommDetails) {
      return (
        <React.Fragment>
          <div className="recomm-details">
            <div className="poster">
              {item.poster && item.poster !== 'N/A' ?
                <img alt="Poster" src={item.poster} /> :
                <div className={'dummy-poster poster-' + item.category.toLowerCase()}></div>}
            </div>

            <div className="info">
              <div className="details-wrap">
                <span className="title">{item.eng_title}</span>
                <span className="orig-title">
                  {item.orig_title === null || item.orig_title === '' || item.orig_title === 'N/A' || item.eng_title === item.orig_title ?
                    '' : item.orig_title + ' (original title)'}
                </span>
                <span className="misc">
                  Year: {item.year}<br />
                  Runtime: {item.runtime || 'N/A'}<br />
                  {item.director ? 'Director: ' + (item.director || 'N/A') : 'Creator: ' + (item.creator || 'N/A')}<br />
                  Stars: {item.stars || 'N/A'}
                </span>
                <div className="actions">
                  <div className="watch-later" title="Watch later" onClick={e => this.props.watchLaterDispatch(item.id)}></div>
                  <div className="recomm" title="Recommend to friends" onClick={e => this.toggleRecomm()}></div>
                  {/* <div className="edit" title="Edit details" onClick={e => this.props.editDetailsDispatch(true, false)}></div> */}
                  <a target="_blank" title="Search for subtitles on Subscene" href={'https://subscene.com/subtitles/title?q=' + item.eng_title.replace(' ', '+')}></a>
                  {recomm && <ul>{this.friends(item.id)}</ul>}
                </div>
              </div>
 
              <div className="plot-txt">{item.plot || 'Plot unavailable.'}</div>
              <div className="sites">
                <a className="imdb" target="_blank" title="Search on IMDB" href={item.imdb_id ?
                  'http://www.imdb.com/title/' + item.imdb_id :
                  'https://www.imdb.com/find?ref_=nv_sr_fn&q=' + item.eng_title.replace(' ', '+')}></a>
                <a className="douban" target="_blank" title="Search on Douban" href={item.douban ?
                  'https://movie.douban.com/subject/' + item.douban :
                  'https://movie.douban.com/subject_search?search_text=' + item.eng_title.replace(' ', '+')}></a>
                <a className="mtime" target="_blank" title="Search on Mtime" href={item.mtime ?
                  'http://movie.mtime.com/' + item.mtime :
                  'http://search.mtime.com/search/?q=' + item.eng_title}></a>
              </div>
            </div>

            {item.trailer ? <div className="recomm-trailer">
              <iframe width="350" height="47.3%" src={item.trailer} frameBorder="0" allowFullScreen></iframe>
              <iframe width="350" height="47.3%" src={item.featurette} frameBorder="0" allowFullScreen></iframe>
            </div> : <div className="no-vid-recomm">No videos</div>}
          </div>
        </React.Fragment>
      )
    } else {
      return ''
    }
  }
}

const mapStateToProps = (store: any) => ({
  loginState: store.loginReducer,
  dataState: store.dataReducer,
  uiState: store.uiReducer
});

const mapDispatchToProps = (dispatch: any) => ({
  watchLaterDispatch: (id: string) => dispatch(watchLaterAct(id)),
  recommDispatch: (vid: string, friendEmail: string) => dispatch(recommAct(vid, friendEmail)),
  commentDispatch: (values: any) => dispatch(commentAct(values)),
  delCommentDispatch: (id: string) => dispatch(delCommentAct(id)),
  editDetailsDispatch: (status: boolean, newRec: boolean) => dispatch(toggleEditDetailsAct(status, newRec))
});

export default connect<{}, {}, ICompProps>(mapStateToProps, mapDispatchToProps)(RecommDetails);