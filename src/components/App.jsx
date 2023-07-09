import React, { useState, createContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { BASE_URL } from "./secret";
import { useAuth0 } from "@auth0/auth0-react";

export const Themecontext = createContext(null);

function App() {
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState(false);
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [editId, setId] = useState("");
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const { user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(true); // Add loading state
  const [email, setEmail] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function expand() {
    setOpen(true);
  }

  const toggleTheme = () => {
    setTheme(!theme);
    document.body.style.backgroundColor = !theme ? "black" : "white";
  };

  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated) {
      setEmail(user.email);
    }

    if (isAuthenticated && email) {
      axios
        .get(BASE_URL + `/${email}`)
        .then((res) => {
          if (res.data === "Email created successfully") {
            setLoading(false);
          } else {
            if (isMounted) {
              setNotes(res.data);
              setLoading(false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [email, isAuthenticated]);

  function addNote(e) {
    e.preventDefault();
    if (note.title.length && note.content.length) {
      setLoading(true);
      axios
        .post(BASE_URL + `/${email}`, note)
        .then((res) => {
          console.log(res.data);
          if (res.data === "fail") alert("Failed");
          else {
            setNotes(res.data);
            setNote({
              title: "",
              content: "",
            });
            setOpen(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      window.alert("Fill all entries...");
    }
  }

  function updateNote(e) {
    e.preventDefault();
    if (note.title.length && note.content.length) {
      setLoading(true);
      axios
        .put(BASE_URL + `/${email}/${editId}`, {
          title: note.title,
          content: note.content,
        })
        .then((res) => {
          if (res.data === "fail") {
            alert("Failed to update data");
          } else {
            setNotes(res.data);
            setNote({
              title: "",
              content: "",
            });
            setOpen(false);
            setChange(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      window.alert("Fill all entries...");
    }
  }

  function editNote(e) {
    setNote({ ...e });
    setChange(true);
    setId(e.id);
    setOpen(true);
  }

  function deleteNote(id) {
    setLoading(true);
    axios
      .delete(BASE_URL + `/${email}/${id}`)
      .then((res) => {
        if (res.data === "fail") {
          alert("Failed to delete note");
        } else {
          setNotes(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <Themecontext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <div id={theme}>
        <Header />
        {isAuthenticated ? (
          <>
            {loading ? (
              <div className="spinner-box">
                <div className="pulse-container">
                  <div className="pulse-bubble pulse-bubble-1"></div>
                  <div className="pulse-bubble pulse-bubble-2"></div>
                  <div className="pulse-bubble pulse-bubble-3"></div>
                </div>
              </div>
            ) : (
              <form
                style={{
                  backgroundColor: theme ? "black" : "white",
                  boxShadow: !theme
                    ? "0 1px 5px rgb(138, 137, 137)"
                    : "0 0 10px 5px rgba(255, 255, 255, 0.1)",
                }}
                className="create-note"
              >
                {open && (
                  <input
                    style={{
                      backgroundColor: theme ? "black" : "white",
                      color: !theme ? "black" : "white",
                    }}
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                  />
                )}
                <textarea
                  style={{
                    backgroundColor: theme ? "black" : "white",
                    color: !theme ? "black" : "white",
                  }}
                  name="content"
                  onClick={expand}
                  onChange={handleChange}
                  value={note.content}
                  placeholder="Take a note..."
                  rows={open ? "3" : "1"}
                />
                <Zoom in={open}>
                  {change ? (
                    <Fab
                      onClick={updateNote}
                      style={{ color: theme ? "black" : "white" }}
                    >
                      <UpdateIcon />
                    </Fab>
                  ) : (
                    <Fab
                      onClick={addNote}
                      style={{ color: theme ? "black" : "white" }}
                    >
                      <AddIcon />
                    </Fab>
                  )}
                </Zoom>
              </form>
            )}
            <div className="container">
              <div>
                {notes &&
                  notes.length > 0 &&
                  notes.map((noteItem, index) => {
                    return (
                      <Note
                        key={index}
                        id={noteItem._id}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                        onEdit={editNote}
                      />
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <Card
              style={{
                margin: "auto 50px",
                backgroundColor: "#ff7034",
                color: !theme ? "white" : "black",
              }}
            >
              <CardContent>
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h3>Please signup/login to view your data</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div>
          <Footer />
        </div>
      </div>
    </Themecontext.Provider>
  );
}

export default App;
