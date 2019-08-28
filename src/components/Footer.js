import React from "react";
import { withRouter } from "react-router-dom";

function Footer(props) {
  return (
    <div>
      <footer class="page-footer text-center font-small mt-4 wow fadeIn bg-dark">
        <hr class="my-4" />
        {/* <!-- Social icons --> */}
        <div class="pb-4">
          <a href="https://www.facebook.com/yanuzn" target="_blank">
            <i class="fab fa-facebook-f mr-3"></i>
          </a>
          <a href="https://twitter.com/yanuz_93" target="_blank">
            <i class="fab fa-twitter mr-3"></i>
          </a>
          <a href="https://instagram.com/yanuz_93" target="_blank">
            <i class="fab fa-instagram mr-3"></i>
          </a>
          <a href="https://github.com/yanuz93" target="_blank">
            <i class="fab fa-github mr-3"></i>
          </a>
        </div>
        {/* <!-- Social icons --> */}

        {/* <!--Copyright--> */}
        <div class="footer-copyright py-3">
          © 2019 Copyright:
          <a href="https://github.com/yanuz93" target="_blank">
            {" "}
            Agrary Great{" "}
          </a>
        </div>
        {/* <!--/.Copyright--> */}
      </footer>
    </div>
  );
}

export default withRouter(Footer);
