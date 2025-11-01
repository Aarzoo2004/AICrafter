import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
// import { FiRefreshCcw } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import Editor from "@monaco-editor/react";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { theme } = useTheme();

  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstarp", label: "HTML + Bootstarp" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "hTML-tailwind-bootstarp", label: "HTML + Tailwind + Bootstarp" },
  ];

  const [outputScreen, setOuputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyBR1Z7kNxE78nnowLW6VW-MJ7mp061gqRk",
  });

  // Custom styles for react-select that adapt to theme
  const selectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1f1f23" : "#ffffff",
      borderColor: theme === "dark" ? "#333" : "#d1d5db",
      color: theme === "dark" ? "#fff" : "#000",
      boxShadow: "none",
      ":hover": { borderColor: theme === "dark" ? "#666" : "#9ca3af" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#141319" : "#ffffff",
      color: theme === "dark" ? "#fff" : "#000",
      border: `1px solid ${theme === "dark" ? "#333" : "#d1d5db"}`,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#2a2a33"
          : "#f3f4f6"
        : state.isSelected
        ? theme === "dark"
          ? "#3b3b45"
          : "#e5e7eb"
        : "transparent",
      color: theme === "dark" ? "#fff" : "#000",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === "dark" ? "#fff" : "#000",
    }),
    placeholder: (base) => ({
      ...base,
      color: theme === "dark" ? "#aaa" : "#6b7280",
    }),
    input: (base) => ({
      ...base,
      color: theme === "dark" ? "#fff" : "#000",
    }),
  };

  const selectTheme = (selectTheme) => ({
    ...selectTheme,
    colors: {
      ...selectTheme.colors,
      primary25: theme === "dark" ? "#2a2a33" : "#f3f4f6",
      primary: "#6b21a8",
      neutral0: theme === "dark" ? "#141319" : "#ffffff",
      neutral80: theme === "dark" ? "#fff" : "#000",
    },
  });

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  async function getResponse() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: ` You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${framework.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single HTML file`,
    });
    console.log(response.text);
    setCode(extractCode(response.text));
    setOuputScreen(true);
    setLoading(false);
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard.");
    } catch (error) {
      console.error("Failed to copy: ", error);
      toast.error("Failed to copy.");
    }
  };

  const downloadFile = () => {
    const fileName = "AICrafter_Code.html";
    const blob = new Blob([code], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File Downloaded Successfully.");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center px-[100px] justify-between gap-[30px]">
        <div className="w-[50%] h-[80vh] bg-gray-50 dark:bg-[#141319] mt-5 p-[20px] rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="text-[25px] font-semibold sp-text">
            Generate UI Components with AI
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-[16px]">
            Describe your component and let AI code it for you.
          </p>
          <p className="text-[15px] font-semibold mt-4 text-[16px] text-gray-900 dark:text-white">
            Framework
          </p>
          <Select
            className="mt-2"
            options={options}
            placeholder="Select a framework type"
            styles={selectStyles}
            theme={selectTheme}
            onChange={(e) => {
              setFramework(e);
            }}
            defaultValue={options[0]}
          />
          <p className="text-[15px] font-[700] mt-5 text-black dark:text-white">
            Describe your component
          </p>
          <textarea
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            value={prompt}
            className="w-full h-[100px] bg-gray-50 dark:bg-[#09090B] border-[1px] border-gray-300 dark:border-gray-800 rounded-md p-2 mt-2 text-black dark:text-white"
            placeholder="Enter your component description"
          />
          <button
            onClick={getResponse}
            className="generate flex items-center p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-500 to-purple-800 mt-3 ml-auto text-white gap-[10px] transition duration-200 hover:from-purple-600 hover:to-purple-900"
          >
            {loading === true ? (
              <>
                <ClipLoader color="white" size={18} /> Generating Component
              </>
            ) : (
              <>
                <BsStars /> Generate Component
              </>
            )}
          </button>
        </div>
        <div className="w-[50%] h-[80vh] bg-white dark:bg-[#141319] mt-5 relative relative overflow-hidden flex flex-col">
          {outputScreen === false ? (
            <>
              <div className="skeleton w-full h-full flex items-center flex-col justify-center">
                <div className="circle p-[20px] w-[70px] h-[70px] flex items-center justify-center text-[30px] h-[70px] rounded-[50%] bg-gradient-to-r from-purple-500 to-purple-800">
                  <HiOutlineCode />
                </div>
                <p className="text-[16px] text-gray-600 dark:text-gray-400 mt-3">
                  Your component & code will appear here.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top w-full h-[60px] bg-gray-100 dark:bg-[#17171C] flex items-center gap-[10px] px-[20px]">
                <button
                  onClick={() => {
                    setTab(1);
                  }}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all text-black dark:text-white ${
                    tab === 1 ? "bg-gray-200 dark:bg-[#333]" : ""
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => {
                    setTab(2);
                  }}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all text-black dark:text-white ${
                    tab === 2 ? "bg-gray-200 dark:bg-[#333]" : ""
                  }`}
                >
                  Preview
                </button>
              </div>
              <div className="top-2 w-full h-[60px] bg-gray-100 dark:bg-[#17171C] flex items-center gap-[15px] px-[20px]">
                <div className="left">
                  <p className="font-bold text-black dark:text-white">
                    Code Editor
                  </p>
                </div>
                <div className="right flex items-center gap-[10px] ml-auto">
                  {tab === 1 ? (
                    <>
                      <button
                        className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-gray-300 dark:border-zinc-800 flex items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-[#333] text-black dark:text-white"
                        onClick={copyCode}
                      >
                        <IoCopy />
                      </button>
                      <button
                        className="export w-[40px] h-[40px] rounded-xl border-[1px] border-gray-300 dark:border-zinc-800 flex items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-[#333] text-black dark:text-white"
                        onClick={downloadFile}
                      >
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="copy w-[40px] h-[40px] rounded-xl border-[1px] border-gray-300 dark:border-zinc-800 flex items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-[#333] text-black dark:text-white"
                        onClick={() => {
                          setIsNewTabOpen(true);
                        }}
                      >
                        <ImNewTab />
                      </button>
                      {/* <button className='export w-[40px] h-[40px] rounded-xl border-[1px] border-gray-300 dark:border-zinc-800 flex items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-[#333] text-black dark:text-white'><FiRefreshCcw /></button> */}
                    </>
                  )}
                </div>
              </div>
              <div
                className={`editor flex-1 ${
                  tab === 1 ? "overflow-auto" : "overflow-hidden"
                }`}
              >
                {tab === 1 ? (
                  <>
                    <Editor
                      value={code}
                      height="100%"
                      theme={theme === "dark" ? "vs-dark" : "light"}
                      language="html"
                      defaultValue=""
                    />
                  </>
                ) : (
                  <>
                    <div className="w-full h-full overflow-auto">
                      <iframe
                        srcDoc={code}
                        className="preview w-full min-h-full bg-white text-black"
                      ></iframe>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isNewTabOpen && (
        <div className="absolute inset-0 bg-white w-screen h-screen overflow-auto">
          <div className="text-black w-full h-[60px] flex items-center justify-between px-5 bg-[#f0dbfa]">
            <p className="font-bold text-[25px] font-[700] sp-text">Preview</p>
            <button
              onClick={() => setIsNewTabOpen(false)}
              className="w-10 h-10 rounded-xl border bg-slate-100 border-zinc-300 flex items-center justify-center hover:bg-gray-200"
            >
              <IoCloseSharp />
            </button>
          </div>
          <iframe
            srcDoc={code}
            className="w-full h-[calc(100vh-60px)]"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Home;
