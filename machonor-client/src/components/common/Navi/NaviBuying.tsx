import * as React from 'react';
import styled from 'styled-components';
import { TiChartBarOutline, TiDocumentText, TiGroupOutline, TiMessages } from 'react-icons/ti';
// import { IoMdBookmark } from 'react-icons/io';

const Positional = styled.div`
  @keyframes  buyingAppear {
    0% {
      opacity: 0;
      transform: scale(10, 10);
      background-color: transparent;
    }
    99% {
      background-color: transparent;
    }
    100% {
      opacity: 1;
      transform: scale(1, 1);
      background-color: #E70D1E;
    }
  }
  color: white;
  width: 32px;
  animation: buyingAppear 0.5s cubic-bezier(0.49, 0.01, 0.14, 0.86);
  animation-fill-mode: forwards;
  margin-top: 6rem;
  position: absolute;
  left: 0;
  input[type="radio"][name="tabs"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  input[type="radio"][name="tabs"]:nth-of-type(1):checked ~ .slide {
    top: calc((100% / 4) * 0);
  }
  input[type="radio"][name="tabs"]:nth-of-type(2):checked ~ .slide {
    top: calc((100% / 4) * 1);
  }
  input[type="radio"][name="tabs"]:nth-of-type(3):checked ~ .slide {
    top: calc((100% / 4) * 2);
  }
  input[type="radio"][name="tabs"]:first-of-type:checked ~ .slide {
    top: 0;
  }
`;

const Box = styled.label`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  svg {
    font-size: 1.1rem;
    width: 100%;
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.7rem;
  padding-top: 0.4rem;
`;

const Slide = styled.div`
  height: calc(100% / 4);
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: absolute;
  width: 3px;
  left: 0rem;
  top: 0;
  transition: top 0.3s ease-out;
  z-index: 100;
`;

const Inner = styled.div`
  width: 100%;
  height: 70%;
  background: white;
`;

interface IProps {
  pathname: string;
  offsetTop: {
    scrollTop: number;
    navTop: number;
    buyerTop: number;
    summaryTop: number;
    NGOTop: number;
    alikeTop: number;
  };
}

interface IState {
  once: boolean;
  selected: string;
}

class NaviBuying extends React.Component<IProps, IState> {
  public state = {
    once: false,
    selected: '',
  };
  public onSelected = (e: any) => {
    const { title } = e.currentTarget;
    this.setState({
      selected: title,
    });
  }
  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (prevProps.offsetTop.scrollTop !== this.props.offsetTop.scrollTop) {
      const { once } = this.state;
      const { scrollTop, navTop, buyerTop, summaryTop, NGOTop } = this.props.offsetTop;
      const scrollCalculator = scrollTop > navTop;
      if (!once && scrollCalculator) {
        this.setState({
          once: true,
        });
      }
      if (scrollTop <= buyerTop) {
        const input  = (document.getElementById('tab1') as HTMLInputElement);
        if (!input) return;
        input.checked = true;
      }
      if ((buyerTop - 100 < scrollTop)) {
        const input  = (document.getElementById('tab1') as HTMLInputElement);
        if (!input) return;
        input.checked = true;
      }
      if ((summaryTop - 100 < scrollTop) && (NGOTop - 100 > scrollTop)) {
        const input  = (document.getElementById('tab2') as HTMLInputElement);
        if (!input) return;
        input.checked = true;
      }
      if ((NGOTop - 100 < scrollTop)) {
        const input  = (document.getElementById('tab3') as HTMLInputElement);
        if (!input) return;
        input.checked = true;
      }
    }
    if (prevState.selected !== this.state.selected) {
      const { buyerTop, NGOTop, summaryTop } = this.props.offsetTop;
      const { selected } = this.state;
      selected === 'rank' ? window.scrollTo(0, buyerTop - 20) : null;
      selected === 'summary' ? window.scrollTo(0, summaryTop - 20) : null;
      selected === 'NGO' ? window.scrollTo(0, NGOTop - 20) : null;
    }
  }
  public render() {
    const { once } = this.state;
    const { pathname } = this.props;
    const isDisplay = pathname === '/@:username/:urlSlug';
    if (!isDisplay || !once) return null;
    return (
      <Positional className="NaviBuying">
        <input type="radio" name="tabs" id="tab1"/>
        <Box htmlFor="tab1" title="rank" onClick={this.onSelected}>
          <TiChartBarOutline />
          <Text>랭킹</Text>
        </Box>
        <input type="radio" name="tabs" id="tab2"/>
        <Box htmlFor="tab2" title="summary" onClick={this.onSelected}>
          <TiDocumentText />
          <Text>개요</Text>
        </Box>
        <input type="radio" name="tabs" id="tab3"/>
        <Box htmlFor="tab3" title="NGO" onClick={this.onSelected}>
          <TiGroupOutline />
          <Text>단체</Text>
        </Box>
        <Box>
          <TiMessages />
          <Text>포럼</Text>
        </Box>
        <Slide className="slide">
          {/* <BookMark /> */}
          <Inner />
        </Slide>
      </Positional>
    );
  }
}

export default NaviBuying;