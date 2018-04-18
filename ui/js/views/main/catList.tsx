'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPages } from '../../util/utils';
import cats from '../../util/cats';
import { setKeyAct, syncCatAct, loadDataAct } from '../../actions/dataActions';
import TileList from './tileList';

class CatList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { dummyPoster: 'images/posters/' + this.props.dataState.category + '.png' };
  }
  
  loadData() {
    if (this.props.dataState.category !== this.props.dataState.prevCat) {
      this.props.syncCat();
      this.props.loadDataDispatch(
        this.props.dataState.category,
        this.props.dataState.currPage,
        this.props.dataState.startAt,
        this.props.dataState.endAt
      )
    }
  }

  componentDidMount() {
    this.loadData();
  }
  
  componentDidUpdate() {
    this.loadData();
  }

  render() {
    return (
      <div className="cat-list">
        <TileList dataRef={this.props.dataState.buffer} showPages={true} category=""/>
      </div>
    )
  }
}

const mapStateToProps = (store: any) => ({
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch: any) => ({
  syncCat: () => {
    dispatch(syncCatAct())
  },
  loadDataDispatch: (category: string, currPage: number, startAt: number, endAt: number) => {
    dispatch(loadDataAct(category, currPage, startAt, endAt))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CatList);
