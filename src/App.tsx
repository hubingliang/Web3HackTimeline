import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Chrono } from "react-chrono";
import data from "./data.json";
import { TimelineMode } from "react-chrono/dist/models/TimelineModel";
import { TimelineItemModel } from "react-chrono/dist/models/TimelineItemModel";
import dayjs from "dayjs";
const themeMap = {
  light: {
    primary: "#2e5041",
    secondary: "#efeae2",
    cardBgColor:
      "background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));",
    cardForeColor:
      "background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));",
    titleColor: "var(--tw-prose-headings)",
    titleColorActive: "var(--tw-prose-headings)",
  },
  dark: {
    primary: "#2e5041",
    secondary: "hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));",
    cardBgColor: "hsl(var(--b3,var(--b2))/var(--tw-bg-opacity))",
    cardForeColor:
      "background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));",
    titleColor: "var(--tw-prose-headings)",
    titleColorActive: "var(--tw-prose-headings)",
  },
};
function App() {
  const [theme, setTheme] = useState(themeMap["light"]);
  const [chronoType, setChronoType] = useState<TimelineMode>("VERTICAL");

  const runColorMode = (fn: (isDarkMode: boolean) => void) => {
    if (!window.matchMedia) {
      return;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");

    fn(query.matches);

    query.addEventListener("change", (event) => fn(event.matches));
  };

  useEffect(() => {
    runColorMode((isDarkMode: boolean) => {
      if (isDarkMode) {
        document.body.classList.add("dark-mode");
        setTheme(themeMap["dark"]);
      } else {
        document.body.classList.remove("dark-mode");
        setTheme(themeMap["light"]);
      }
    });
  }, []);

  useEffect(() => {
    document.body.clientWidth < 768
      ? setChronoType("VERTICAL")
      : setChronoType("VERTICAL_ALTERNATING");
  }, [document.body.clientWidth]);

  return (
    <div className="App bg-base-200">
      <button className="btn btn-lg btn-ghost drawer-button btn-square normal-case git-btn">
        <a
          aria-label="Github"
          target="_blank"
          href="https://github.com/saadeghi/daisyui"
          rel="noopener"
          // className="btn btn-ghost drawer-button btn-square normal-case"
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="inline-block h-16 w-16 fill-current md:h-12 md:w-12"
          >
            <path d="M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z"></path>
          </svg>
        </a>
      </button>
      {/* <button className="btn btn-lg btn-ghost drawer-button btn-square normal-case twitter-btn">
        <a
          target="_blank"
          href="https://github.com/saadeghi/daisyui"
          rel="noopener"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="inline-block h-16 w-16 fill-current md:h-12 md:w-12"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
      </button> */}

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-boldF">Web3 Hack Timeline</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <p className="py-6">
              Created by{" "}
              <a
                className="link"
                href="https://github.com/hubingliang"
                target="_blank"
              >
                Brian Hu
              </a>
            </p>
            <button
              className="btn"
              onClick={() => {
                // window.scrollTo(0, window.screen.height);

                document
                  .querySelector("div[data-testid=tree-main]")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <Chrono
        allowDynamicUpdate
        theme={theme}
        useReadMore={false}
        disableClickOnCircle
        hideControls
        items={
          chronoType === "VERTICAL_ALTERNATING"
            ? data.map((i) => {
                return {
                  title: dayjs(`${i.time}`, "YYYYMMDD").format("YYYY-MM-DD"),
                  // cardTitle: i.title,
                  // url: i.reference[0]?.link,
                  // cardDetailedText: i.content
                  //   .split(/[\n]/)
                  //   .filter((content) => content !== ""),
                };
              })
            : []
        }
        mode={chronoType}
        classNames={{
          card: "custom-card card",
          cardMedia: "custom-card-media",
          cardSubTitle: "custom-card-subtitle",
          cardText: "custom-card-text",
          cardTitle: "card-title text-2xl",
          controls: "custom-controls",
          title: "time-text italic",
        }}
      >
        {data.map((i, index) => {
          return (
            <div
              className="prose max-w-none shadow-xl rounded-md p-4 bg-white"
              style={{ width: "100%" }}
              key={index}
            >
              <h1>{i.title}</h1>
              {i.content
                .split(/[\n]/)
                .filter((content) => content !== "")
                .map((content, index) => {
                  return (
                    <p className="content text-lg" key={index}>
                      {content}
                    </p>
                  );
                })}
              <ul>
                {i.reference.map((item, index) => {
                  return (
                    <li key={index}>
                      <a href={item.link}>{item.linkTitle}</a>
                      {item.suffix && <span>{item.suffix}</span>}
                    </li>
                  );
                })}
              </ul>
              <div className="gap-2 flex">
                {i.types.map((type, index) => {
                  return (
                    <div className="badge" key={index}>
                      {type}
                    </div>
                  );
                })}
              </div>
              <div className="gap-2 flex mt-2">
                {i.techTags.map((tag, index) => {
                  return (
                    <div className="badge badge-primary" key={index}>
                      {tag}
                    </div>
                  );
                })}
              </div>
              <div className="gap-2 flex mt-2">
                {i.themeTags.map((tag, index) => {
                  return (
                    <div className="badge badge-secondary" key={index}>
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Chrono>
      <footer className="footer items-center p-4 bg-neutral text-neutral-content">
        <div className="items-center grid-flow-col">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>Copyright © 2022 - All right reserved</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
