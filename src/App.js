import React, { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const json = `{
  "name": "Document",
  "children": [
    {
      "name": "Head",
      "children": [{ "name": "Script" }]
    },
    {
      "name": "Body",
      "children": [
        { "name": "Img" },
        { "name": "Span" },
        { "name": "Paragraph" },
        { "name": "Button" },
        {
          "name": "Select",
          "children": [{ "name": "React" }, { "name": "PReact" }]
        },
        {
          "name": "Form",
          "children": [
            { "name": "Label" },
            { "name": "Input" },
            { "name": "Submit" }
          ]
        }
      ]
    }
  ]
}`;

const MyUl = styled(motion.ul)`
  ${(props) => {
    const depth = props.depth;
    if (depth === 0) {
      return `
      cursor: pointer;
  list-style-type: none;
  margin: 0;
  padding: 0;
      margin-left:0px;`;
    } else if (depth === 1) {
      return `  cursor: pointer;
  list-style-type: none;
  margin: -1px;
  padding: 0;
      
      margin-left:7px;`;
    } else {
      return `  cursor: pointer;
  list-style-type: none;
  margin: -6px;
  padding: 0;
  
      margin-left:7px;`;
    }
  }};
`;

const MyLi = styled(motion.li)`
  ${(props) => {
    const depth = props.depth;

    if (depth === 0) {
      return "";
    } else if (depth === 1) {
      return `
      margin: 0;
  padding: 0 7px;
  line-height: 20px;
 margin-left:10px;
  font-weight: bold;
  border-left: 1px solid rgba(47, 56, 65, 1);



      &::before {
        position: relative;
  top: -0.3em;
height: 1em;
width:9px;
color: white;
  border-bottom: 1px solid rgba(47, 56, 65, 1);
  content: "";
  display: inline-block;
  left: -7px;
}
  
  
  &:last-child {
    border-left: none;
  }




  &:last-child:before {
    position: relative;
    top: -7px;
  border-left: 1px solid rgba(47, 56, 65, 1);
  left: -7px
  border-left: 1px solid rgba(47, 56, 65, 1);
}`;
    } else {
      return `
      margin: 0;
  padding: 0 7px;
  line-height: 20px;
 
  font-weight: bold;
  border-left: 1px solid rgba(47, 56, 65, 1);



      &::before {
        position: relative;
  top: -7px;
height: 25px;
width:9px;
color: white;
  border-bottom: 1px solid rgba(47, 56, 65, 1);
  content: "";
  display: inline-block;
  left: -8px
}
  
  
  &:last-child {
    border-left: none;
  }




  &:last-child:before {
    position: relative;
  top: -7px;
  border-left: 1px solid rgba(47, 56, 65, 1);
  left: -7px
}`;
    }
  }}
`;

function App() {
  const [jsonInput, setJsonInput] = useState(`
  {
    "name": "Document",
    "children": [
      {
        "name": "Head",
        "children": []
      },
      {
        "name": "Body",
   "children": []
      }
    ]
  }`);
  const [isJsonValid, setIsJsonValid] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeDepth, setSelectedNodeDepth] = useState(0);

  const [json, setJson] = useState(null);

  useEffect(() => {
    try {
      const json = JSON.parse(jsonInput);
      setJson(json);
      setIsJsonValid(true);
    } catch (err) {
      console.log(err);
      setIsJsonValid(false);
    }
  }, [jsonInput]);

  return (
    <div
      style={{
        height: "calc(100vh - 60px)",
        fontFamily: "Roboto",
        display: "",
      }}
    >
      <div
        style={{
          height: 60,
          backgroundColor: "#17293E",
          display: "flex",
          alignItems: "center",
          paddingLeft: 22,
          fontFamily: "Roboto",
          fontWeight: "700",
          fontSize: 16,
          color: "white",
          fontStyle: "italic",
        }}
      >
        <h4>Coding Challenge</h4>
      </div>
      <div style={{ display: "flex", height: "100%" }}>
        <div
          style={{
            flexBasis: 266,
            backgroundColor: "#171D24",
            display: "flex",
            flexDirection: "column",
            paddingLeft: 21,
            paddingRight: 21,
            paddingTop: 18,
            paddingBottom: 18,
          }}
        >
          <input
            type="text"
            placeholder="Search Node"
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              width: "100%",
              height: 40,
              borderRadius: 3,
              border: "none",
              backgroundColor: "#222B35",
              color: "white",
              padding: 8,
              boxSizing: "border-box",
              marginBottom: 14,
            }}
          />
          <div style={{ overflowY: "scroll", flex: 1 }}>
            <TreeComponent
              json={json}
              searchInput={searchInput}
              setSelectedNode={setSelectedNode}
              setSelectedNodeDepth={setSelectedNodeDepth}
              initialDepth={-1}
              selectedNode={selectedNode}
              selectedNodeDepth={selectedNodeDepth}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#C4C4C4",
            display: "flex",
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 20,
            paddingBottom: 20,
            boxSizing: "border-box",
            flexDirection: "column",
          }}
        >
          <h4 style={{ marginBottom: 0, flexShrink: 0 }}>
            Enter Valid JSON below{" "}
            {isJsonValid ? undefined : (
              <span style={{ color: "red" }}> "JSON Is Not Valid"</span>
            )}
          </h4>
          <div style={{ flex: 1, marginTop: 9 }}>
            <textarea
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setSelectedNodeDepth(null);
                setSelectedNode(null);
              }}
              style={{
                borderRadius: 4,
                border: "none",
                resize: "none",
                boxSizing: "border-box",
                width: "100%",
                minHeight: "100%",
                padding: 22,
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 400,
              }}
            />
          </div>
        </div>

        <div
          style={{
            flexBasis: 211,
            backgroundColor: "#171D24",
            color: "white",
            fontSize: 13,

            padding: 15,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <p>
            SELECTED NODE: &nbsp;&nbsp;&nbsp;
            <span style={{ color: "rgba(1, 128, 232, 1)" }}>
              {selectedNode}
            </span>
          </p>
          <p>
            DEPTH: &nbsp;&nbsp;&nbsp;
            <span style={{ color: "rgba(1, 128, 232, 1)" }}>
              {selectedNodeDepth}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const variants = {
  open: { rotate: 0 },
  closed: { rotate: -90 },
};

function TreeComponent({
  json,
  searchInput,
  setSelectedNode,
  setSelectedNodeDepth,
  initialDepth,
  selectedNodeDepth,
  selectedNode,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [depth] = useState(initialDepth + 1);
  if (!json) {
    return null;
  }

  const temp = json?.name?.toLowerCase();
  if (searchInput !== "" && !temp.includes(searchInput) && depth !== 0) {
    return (
      <>
        {json?.children?.map((item, index) => (
          <TreeComponent
            key={index + item.name}
            json={item}
            searchInput={searchInput}
            setSelectedNode={setSelectedNode}
            setSelectedNodeDepth={setSelectedNodeDepth}
            initialDepth={depth}
            selectedNode={selectedNode}
            selectedNodeDepth={selectedNodeDepth}
          />
        ))}
      </>
    );
  }

  const textStyle = () => {
    if (depth === 0) {
      return {
        color:
          depth === selectedNodeDepth && selectedNode === json.name
            ? "rgba(0, 135, 245, 1)"
            : "white",
        fontFamily: "Roboto",
        fontSize: 12,
        marginLeft: 8,
      };
    } else if (depth === 1) {
      return {
        color:
          selectedNodeDepth && selectedNode === json.name
            ? "rgba(0, 135, 245, 1)"
            : "rgba(152, 171, 186, 1)",
        fontFamily: "Roboto",
        fontSize: 12,
      };
    } else {
      return {
        color:
          selectedNodeDepth && selectedNode === json.name
            ? "rgba(0, 135, 245, 1)"
            : "rgba(137, 156, 172, 1)",
        fontFamily: "Roboto",
        fontSize: 12,
        fontWeight: 300,
        position: "relative",
        top: -4,
        left: -4,
      };
    }
  };

  if (depth === 0 && json.children?.length > 0) {
    return (
      <MyUl
        depth={depth}
        onClick={(e) => {
          e.stopPropagation();

          setSelectedNode(json.name);
          setSelectedNodeDepth(depth);
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          {depth === 0 && <LayerIcon />}

          <span style={textStyle()}>{json.name}</span>
        </div>

        {json?.children?.map((item, index) => (
          <TreeComponent
            key={index + item.name}
            json={item}
            searchInput={searchInput}
            setSelectedNode={setSelectedNode}
            setSelectedNodeDepth={setSelectedNodeDepth}
            initialDepth={depth}
            selectedNode={selectedNode}
            selectedNodeDepth={selectedNodeDepth}
          />
        ))}
      </MyUl>
    );
  }

  if (json.children?.length > 0) {
    return (
      <MyLi
        depth={depth}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
          setSelectedNode(json.name);
          setSelectedNodeDepth(depth);
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          {depth === 0 && <LayerIcon />}
          {depth > 0 && json.children?.length > 0 && (
            <motion.svg
              animate={isOpen ? "open" : "closed"}
              variants={variants}
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              viewBox="0 0 5 5"
              fill="none"
              style={{
                left: -5,
                top: -2,
                position: "relative",
              }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.60367 4.30376L0.558775 0.972884L4.64856 0.972884L2.60367 4.30376Z"
                fill="#98ABBA"
              ></path>
            </motion.svg>
          )}
          <span style={textStyle()}>{json.name}</span>
        </div>
        <AnimatePresence>
          {isOpen && (
            <MyUl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              depth={depth}
            >
              {json?.children?.map((item, index) => (
                <TreeComponent
                  key={index + item.name}
                  json={item}
                  searchInput={searchInput}
                  setSelectedNode={setSelectedNode}
                  setSelectedNodeDepth={setSelectedNodeDepth}
                  initialDepth={depth}
                  selectedNode={selectedNode}
                  selectedNodeDepth={selectedNodeDepth}
                />
              ))}
            </MyUl>
          )}
        </AnimatePresence>

        {/* </MyUl> */}
      </MyLi>
    );
  }

  return (
    <MyLi
      depth={depth}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(json.name);
        setSelectedNodeDepth(depth);
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        {depth === 0 && <LayerIcon />}

        <span style={textStyle()}>{json.name}</span>
      </div>

      {json?.children?.map((item, index) => (
        <TreeComponent
          key={index + item.name}
          json={item}
          searchInput={searchInput}
          setSelectedNode={setSelectedNode}
          setSelectedNodeDepth={setSelectedNodeDepth}
          initialDepth={depth}
          selectedNode={selectedNode}
          selectedNodeDepth={selectedNodeDepth}
        />
      ))}
    </MyLi>
  );
}

function LayerIcon() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
        backgroundColor: "rgba(39, 50, 63, 1)",
        borderRadius: 4,
        zIndex: 10,
      }}
    >
      <svg
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.253 6.50792C12.7613 6.75708 12.9714 7.37114 12.7222 7.87944C12.6365 8.05439 12.503 8.20065 12.338 8.30188L12.253 8.34866L7.31082 10.7713C7.0521 10.8981 6.75327 10.9096 6.48726 10.8059L6.40851 10.7713L1.46632 8.34866C0.958013 8.09949 0.747937 7.48544 0.997103 6.97713C1.08286 6.80218 1.21638 6.65592 1.38131 6.5547L1.46632 6.50792L2.27757 6.10553L2.81287 6.41861L1.6919 6.9681C1.58984 7.01813 1.50731 7.10066 1.45729 7.20271C1.3416 7.43871 1.42391 7.7203 1.63975 7.85907L1.6919 7.88847L6.63409 10.3111C6.7586 10.3721 6.90169 10.3797 7.03084 10.334L7.08524 10.3111L12.0274 7.88847C12.1295 7.83845 12.212 7.75592 12.262 7.65387C12.3777 7.41787 12.2954 7.13628 12.0796 6.99751L12.0274 6.9681L10.8326 6.38239L11.3975 5.95843L12.253 6.50792Z"
          fill="#419EF7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.31082 1.81328L12.253 4.23588C12.7613 4.48505 12.9714 5.0991 12.7222 5.60741C12.6222 5.81152 12.4571 5.97658 12.253 6.07663L7.31082 8.49923C7.02623 8.63874 6.6931 8.63874 6.40851 8.49923L1.46632 6.07663C0.958012 5.82746 0.747936 5.21341 0.997102 4.7051C1.09715 4.50099 1.26221 4.33593 1.46632 4.23588L6.40851 1.81328C6.6931 1.67377 7.02623 1.67377 7.31082 1.81328ZM12.0274 5.61637C12.1295 5.56634 12.212 5.48381 12.262 5.38176L12.2853 5.32658C12.3709 5.08468 12.2634 4.81168 12.0274 4.696L7.08524 2.27339C6.94295 2.20364 6.77638 2.20364 6.63409 2.27339L1.6919 4.696C1.58984 4.74602 1.50731 4.82855 1.45729 4.93061C1.3327 5.18476 1.43774 5.49179 1.6919 5.61637L6.63409 8.03898C6.77638 8.10873 6.94295 8.10873 7.08524 8.03898L12.0274 5.61637Z"
          fill="#419EF7"
        />
      </svg>
    </div>
  );
}

function TrianlgeSvg() {
  return (
    <svg
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.60367 4.30376L0.558775 0.972884L4.64856 0.972884L2.60367 4.30376Z"
        fill="#98ABBA"
      />
    </svg>
  );
}

export default App;
