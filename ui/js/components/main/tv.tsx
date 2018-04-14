'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPages, resetFooter } from '../../util/utils';
import cats from '../../util/cats';
import { loadDataAct, setKeyAct } from '../../actions/dataActions';
import Pages from '../pages';

class Tv extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { dummyPoster: 'images/posters/' + cats.TV + '.png' };
  }

  componentWillMount() {
    // let data = this.props.dataState.data;
    
    // if (data.constructor === Object && Object.keys(data).length === 0) {
    if (this.props.dataState.category === cats.TV) {
      this.props.loadDataDispatch(
        cats.TV,
        this.props.dataState.currPage,
        this.props.dataState.startAt,
        this.props.dataState.endAt
      )
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', resetPages, true);
    window.addEventListener('resize', resetPages, true);
    resetFooter();
  }
  
  componentDidUpdate() {
    // setTimeout(() => {
    //   resetPages();
    //   resetFooter();
    // }, 200);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', resetPages, true);
    window.removeEventListener('resize', resetPages, true);
  }

  render() {
    const { dataState } = this.props;

    return (
      <div className="list">
        {dataState.data && Object.keys(dataState.data).length && Object.keys(dataState.data).map((key: any) => {
          return <div className="tile" key={key}>
            <Link to={"/main/details/" + key} onClick={e => this.props.setKeyDispatch(key)}>
              {dataState.data[key].poster && dataState.data[key].poster !== 'N/A' ?
                <img className="thumbnail" alt="Poster" src={dataState.data[key].poster} /> :
                <div className={'dummy-poster-' + cats.TV.toLowerCase()}></div>}
            </Link>
            <div className="details">
              <div className="title">{dataState.data[key].engTitle}</div>
              <div className="details-btm">
                <span className="year">{dataState.data[key].year}</span>
                <br />{dataState.data[key].creator}
              </div>
            </div>
          </div>
        })}
        {dataState.data && Object.keys(dataState.data).length && <Pages />}
      </div>
    )
  }
}

const mapStateToProps = (store: any) => ({
  dataState: store.dataReducer
});

const mapDispatchToProps = (dispatch: any) => ({
  loadDataDispatch: (category: string, currPage: number, startAt: number, endAt: number) => {
    dispatch(loadDataAct(category, currPage, startAt, endAt))
  },
  setKeyDispatch: (key: string) => {
    dispatch(setKeyAct(key))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Tv);
