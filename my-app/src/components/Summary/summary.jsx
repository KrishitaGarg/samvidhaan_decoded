import React, { useEffect, useState } from "react";
import "./summary.css";
import { useParams, useSearchParams, Link } from "react-router-dom";
import MarkdownRender from "../markdownrender";
import logo from "../../assets/logo.png";
import { useTheme } from "../ThemeToggle/ThemeToggle.jsx";
import Loading from "../Loading/Loading.jsx";

const DetailsPage = () => {
  const { categoryId: categoryIdParam } = useParams();
  const [name, setName] = useState("");
  const [articles, setArticles] = useState([]);
  const [description, setDescription] = useState("");
  const [showArticles, setShowArticles] = useState(false);
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();

  const category_id = searchParams.get("category") || categoryIdParam;

  useEffect(() => {
    fetchArticles(category_id);
  }, [category_id]);

  const fetchArticles = async (category) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/user/${category}/get-category/`
      );
      const data = await response.json();

      const parsedArticles = parseDescription(data.description);
      setArticles(parsedArticles);
      setName(data.name);
      setDescription(data.description);
    } catch (e) {
      console.error("Error fetching articles:", e);
    } finally {
    }
  };

  const parseDescription = (description) => {
    const lines = description.split("\n");

    let articles = [];
    let currentArticle = null;

    lines.forEach((line) => {
      if (line.startsWith("# ")) {
        if (currentArticle) {
          articles.push(currentArticle);
        }
        currentArticle = {
          title: line.replace("# ", "").trim(),
          summary: "",
          content: "",
          showContent: false,
        };
      } else if (line.startsWith("## ") && currentArticle) {
        currentArticle.summary = line.replace("## ", "").trim();
      } else if (currentArticle) {
        currentArticle.content += line.trim() ? `${line}\n` : ""; 
      }
    });

    if (currentArticle) {
      articles.push(currentArticle);
    }

    return articles;
  };

  return (
    <div>
    <Loading />
    <div className={`${theme}-theme`}>
      <div className="details-page">
        <section className="content">
          <div className="title">
            <h1>{name}</h1>
          </div>
          <div className="title-section">
            <MarkdownRender content={description} />{" "}
          </div>
        </section>

        <div className="chatbot-link">
          <Link
            to={`/category-chatbot/${category_id}`}
            className="chatbot-button"
          >
            <img src={logo} alt="Chatbot Logo" className="chatbot-logo" />
            <span className="chatbot-text">Ask about {name}</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default DetailsPage;
