import React, { useState } from 'react';

export default function Portfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle the modal open/close actions
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="animated notlikeall">
      <div className="row">
        {/* Songs Section */}
        <div className="col-md-6">
          <section className="animated box smaller">
            <div>
              <div className="songs">
                <div className="row">
                  <div className="col-7">
                    <h2 className="fa fa-music"> Songs</h2>
                    <p className="m">I also create music! Check out my playlist on Suno:</p>
                    <a
                      href="https://suno.com/playlist/08dc9ca7-c085-47ad-847f-ef0189a3ebfb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      Listen on Suno
                    </a>
                  </div>
                  <div className="col-5">
                    <p>
                      <a
                        href="https://suno.com/playlist/08dc9ca7-c085-47ad-847f-ef0189a3ebfb"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="0003.png" className="img-fluid" alt="Suno Playlist" id="suno" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Books Section */}
        <div className="col-md-6">
          <section className="animated box smaller">
            <div>
              <div className="songs">
                <div className="row">
                  <div className="col-7">
                    <h2 className="fa">&#128214; My books</h2>
                    <p className="m">I make songs, and I also write books, please check them out:</p>
                    <a
                      href="https://www.wattpad.com/user/thejasonronin04"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button"
                    >
                      Check My Books on Wattpad
                    </a>
                  </div>
                  <div className="col-5">
                    <p>
                      <a
                        href="https://www.wattpad.com/user/thejasonronin04"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src="wattpad.png" className="img-fluid" alt="Wattpad" id="suno" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Sign In/Sign Up Section */}
      <div className="re">
        <section>
          <div className="res signin">
            <div className="row">
              <h3>&#9827; Sign In</h3>
              <h3>/</h3>
              <h3>Sign Up</h3>
            </div>
            <div className="row">
              <button
                className="button"
                id="signInUpBtn"
                onClick={handleModalToggle}
              >
                Follow For More
              </button>
              <p id="or">or</p>
              <a
                href="https://csikszabi04.github.io/signin/"
                className="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign Up / In
              </a>
            </div>

            {/* Modal for Newsletter */}
            {isModalOpen && (
              <div id="signoverlay" className="signoverlay">
                <div className="form-container">
                  <span
                    className="close-btn"
                    id="closeBtn"
                    onClick={handleModalToggle}
                  >
                    &times;
                  </span>
                  <h2>Join our newsletter</h2>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="modal-input"
                  />
                  <button
                    id="submitBtn"
                    onClick={() => alert('Submitted!')}
                    className="submit-btn"
                  >
                    Submit
                  </button>
                  <div id="message" className="mt-3"></div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
