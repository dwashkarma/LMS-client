"use client";
import { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

export default function CourseCard() {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=c7ad30435c994ec8b2f7ef9984405da9"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.articles); // Set the articles array to state
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: "30%",
      }}
    >
      <IconButton
        onClick={() => handleScroll("left")}
        sx={{ position: "absolute", left: 0, zIndex: 1 }}
      >
        <ArrowBackIos />
      </IconButton>
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "16px",
          flexGrow: 1,
          scrollBehavior: "smooth",
          /* Hide scrollbar for WebKit browsers */
          scrollbarWidth: "none" /* Firefox */,
        }}
      >
        {data.map((article, index) => (
          <div
            key={index}
            style={{
              minWidth: "300px",
              marginRight: "16px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardMedia
              style={{ height: "180px" }}
              image={article.urlToImage || "default-image-url"} // Provide a default image URL if needed
              title={article.title || "Default Title"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {article.title || "Default Title"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description || "Default Description..."}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href={article.url} target="_blank">
                Read More
              </Button>
            </CardActions>
          </div>
        ))}
      </div>
      <IconButton
        onClick={() => handleScroll("right")}
        sx={{ position: "absolute", right: 0, zIndex: 1 }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}
