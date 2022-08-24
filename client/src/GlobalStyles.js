import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --font-heading: Esthetique, Helvetica, Arial, sans-serif;
    --font-body: Helvetica, Arial, sans-serif;
    --padding-page: 24px;
    --border-radius: 15px;
    --yellow: #ffeb3b;
    --blue: #007fff;
    --off-white: #f5f5f5;
  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */
      

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      text-decoration: none;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
      height: 100%;
  overflow: auto;
 background: linear-gradient(90deg, rgba(255,221,0,1) 0%, rgba(251,176,52,1) 100%);
 
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  h1,
h2,
h3,
label,
button {
  font-family: var(--font-heading);
  text-align: center;
}

p,
a,
li,
blockquote,
input {
  font-family: var(--font-body);
}

/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }

input[type="checkbox"] {
  margin: 0;
  width: 1.2em;
  height: 1.2em;
  background: red;

  &:hover {
    cursor: pointer;
  }
}

hr {
  border: 0.1px solid grey;
  width: 100%;
  opacity: 0.8;
  margin-bottom: 1rem;
}
`;
