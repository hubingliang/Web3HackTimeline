import React, { useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "ahooks";
import resultData from "./data.json";
import { Chrono } from "react-chrono";
import { TimelineMode } from "react-chrono/dist/models/TimelineModel";
import dayjs from "dayjs";

interface Result {
  list: {
    title: string;
    content: string;
    themeTags: string[];
    types: string[];
    techTags: string[];
    blockchainTags: string[];
    reference: (
      | {
          link: string;
          linkTitle: string;
          suffix: null;
        }
      | {
          link: string;
          linkTitle: string;
          suffix: string;
        }
    )[];
    time: string;
  }[];
  nextId: string | undefined;
}

function getLoadMoreList(
  nextId: any | undefined,
  limit: number
): Promise<Result> {
  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i.time === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end);
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId?.time,
      });
    }, 1000);
  });
}
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
export const Timeline = () => {
  const [theme, setTheme] = useState(themeMap["light"]);

  const ref = useRef<HTMLDivElement>(null);
  const [chronoType, setChronoType] = useState<TimelineMode>("VERTICAL");

  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => getLoadMoreList(d?.nextId, 10),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    }
  );
  const runColorMode = (fn: (isDarkMode: boolean) => void) => {
    if (!window.matchMedia) {
      return;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");

    fn(query.matches);

    query.addEventListener("change", (event) => fn(event.matches));
  };
  useEffect(() => {
    document.body.clientWidth < 768
      ? setChronoType("VERTICAL")
      : setChronoType("VERTICAL_ALTERNATING");
  }, []);
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
  return (
    <div
      ref={ref}
      style={{
        // height: 150,
        overflow: "auto",
        // border: "1px solid",
        padding: 12,
      }}
    >
      {loading ? (
        <p>loading</p>
      ) : (
        <Chrono
          allowDynamicUpdate
          theme={theme}
          useReadMore={false}
          disableClickOnCircle
          hideControls
          items={
            chronoType === "VERTICAL_ALTERNATING"
              ? data?.list.map((i) => {
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
          {data?.list.map((i, index) => {
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
      )}

      <div style={{ marginTop: 8 }}>
        {!noMore && (
          <button type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "Loading more..." : "Click to load more"}
          </button>
        )}

        {noMore && <span>No more data</span>}
      </div>
    </div>
  );
};
