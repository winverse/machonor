import { createGlobalStyle } from 'styled-components'; 

const GlobalStyles = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&subset=korean');
	@import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&subset=korean');
	@import url('https://fonts.googleapis.com/css?family=Rajdhani:700');
	@import url('https://fonts.googleapis.com/css?family=Roboto+Mono|Russo+One');
  @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&subset=korean');
	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	body, html {
    margin: 0;
		background-color:	#f5f5f5;
		min-height: 100vh;
		box-sizing: border-box;
		font-family: 'Noto Sans KR', "NanumGothic", "맑은 고딕", arial, sans-serif;
		letter-spacing: -2px;
		line-height: 1;
		-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
	}

	body {
		position: relative;
		max-width: 1920px;
    margin: 0 auto;
	}

	main{
		display: block;
	}

	#root {
		min-height: 100vh;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	/* 에디터 스타일 */
	
	pre {
    padding: 10px;
    background-color: #eee;
    white-space: pre-wrap;
  }

  :not(pre) > code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
  }

  blockquote {
  border-left: 2px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
}

  blockquote[dir='rtl'] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #ddd;
  }

  table {
    border-collapse: collapse;
  }

  td {
    padding: 10px;
    border: 2px solid #ddd;
  }

  input {
    box-sizing: border-box;
    font-size: 0.85em;
    width: 100%;
    padding: 0.5em;
    border: 2px solid #ddd;
    background: #fafafa;
  }

  input:focus {
    outline: 0;
    border-color: blue;
  }
  
  ::selection {
    background-color: Rgba(230, 0, 19, 0.949);
    color: #FFF;
    text-shadow: none;
  }
  ::-moz-selection {
    background-color: Rgba(230, 0, 19, 0.949);
    color: #FFF;
    text-shadow: none;
  }
  ::-webkit-selection {
    background-color: Rgba(230, 0, 19, 0.949);
    color: #FFF;
    text-shadow: none;
  }

  button {
  border: none;
  cursor: pointer;
  color: white;
  padding: 15px 40px;
  border-radius: 2px;
  font-size: 22px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .4);
  background-color: rgba(230, 0, 19, 0.949);
}

/* Ripple magic */
  button{
    position: relative;
    overflow: hidden;
  }

  button:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(230, 0, 19, 0.449);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 1;
    }
    20% {
      transform: scale(40, 40);
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(80, 80);
    }
  }

  button:focus:not(:active)::after {
    animation: ripple 1s ease-out;
  }

`;

export default GlobalStyles;
