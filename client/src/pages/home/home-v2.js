import React, { useState } from "react";

import styled from "styled-components";
import _ from "lodash";

import NowPlaying from "./display-components/now-playing";

function HomeV2Container() {
  const [showNowPlaying, setNowPlaying] = useState(false);

  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }
  const params = getHashParams();
  const token = params.access_token;

  return (
    <Page>
      {token && (
        <React.Fragment>
          <CurrentTrack>
            {showNowPlaying && <NowPlaying token={token} />}
            <button onClick={() => setNowPlaying(true)}>
              Check Now Playing
            </button>
          </CurrentTrack>
        </React.Fragment>
      )}
    </Page>
  );
}

export default HomeV2Container;

// export default class HomeV2 extends Component {
//   constructor() {
//     super();
//     const params = this.getHashParams();
//     const token = params.access_token;
//     this.state = {
//       loggedIn: token ? true : false
//     };
//   }

//   getHashParams() {
//     var hashParams = {};
//     var e,
//       r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     e = r.exec(q);
//     while (e) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//       e = r.exec(q);
//     }
//     return hashParams;
//   }

//   render() {
//     return (
//       <Page>
//         {this.state.loggedIn && (
//           <React.Fragment>
//             <CurrentTrack>
//               <NowPlaying nowPlaying={this.state.nowPlaying} />
//               <button onClick={() => console.log("graphql query")}>
//                 Check Now Playing
//               </button>
//             </CurrentTrack>
//           </React.Fragment>
//         )}
//       </Page>
//     );
//   }
// }

const Page = styled.div`
  display: grid;
  text-align: center;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1px 1px;
  grid-template-areas: "CurrentTrack Sliders"
  "Recommendations Recommendations";
}
`;

const CurrentTrack = styled.div`
  grid-area: CurrentTrack;
`;

const Sliders = styled.div`
  grid-area: Sliders;
`;

const Recommendations = styled.div`
  grid-area: Recommendations;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1px 1px;
`;
