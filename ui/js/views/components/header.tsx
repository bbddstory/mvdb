'use strict';

import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchCatAct } from '../../actions/categoriesActions';
import { toggleEditDetailsAct } from '../../actions/uiActions';
import cats from '../../util/cats';

class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <nav className="header">
        <a target="_blank" href="http://10.0.0.1:5000" className="logo" title="Local connect"></a>
        <div className="nav-opts">
          <Link to="/main/home" className="opt-home" title="Home" onClick={e => this.props.switchCatDispatch(cats.HOME)}></Link>
          <span className="opt-add" title="Add video" onClick={e => this.props.editDetailsDispatch(true, true)}></span>
          <a target="_blank" href="http://quickconnect.to/phantomzone" className="opt-quick" title="Quick connect" ></a>
          {/* <Link to="/main/notices" className="opt-notice" title="Notifications"></Link> */}
          {/* <Link to="/main/messages" className="opt-msg" title="Messages"></Link> */}
          <Link to="/main/me" className="opt-me" title="Me">{this.props.loginState.nickname}</Link>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (store: any) => ({
  loginState: store.loginReducer
});

const mapDispatchToProps = (dispatch: any) => ({
  switchCatDispatch: (cat: string) => {
    dispatch(switchCatAct(cat))
  },
  editDetailsDispatch: (status: boolean, newRec: boolean) => dispatch(toggleEditDetailsAct(status, newRec))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);