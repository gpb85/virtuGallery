import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExpandableText = ({ text, limit = 15 }) => {
  const safeText = typeof text === "string" ? text : String(text ?? "");
  const [expanded, setExpanded] = useState(false);
  const isLong = safeText.length > limit;
  const shortText = `${safeText.slice(0, limit)}...`;

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div
      className={`item-description ${expanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      {expanded || !isLong ? safeText : shortText}
      {isLong && (
        <span
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
            marginLeft: "6px",
            userSelect: "none",
          }}
        >
          {expanded ? " λιγότερα" : " περισσότερα"}
        </span>
      )}
    </div>
  );
};

export default ExpandableText;
