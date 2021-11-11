import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Button, Container, Grid, Segment, Form } from "semantic-ui-react";

const FirebaseCrud = () => {
  const [newName, setNewName] = useState("");
  const [otherName, setNewOtherName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { firstname: newName, lastname: otherName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="ui hidden diver">
        <Container>
            <Grid>
            <Grid.Row columns="2">
                <Grid.Column>
                    <Segment>
                        <Form>
                        <Form.Field>

        <label>First Name</label>

      <input
        placeholder="FirstName..."
        focus
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      </Form.Field>
      
                        <Form.Field>

        <label>Last Name</label>

      <input
        placeholder="LastName..."
        focus
        onChange={(event) => {
          setNewOtherName(event.target.value);
        }}
      />
      </Form.Field>
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
     
      <Button onClick={createUser}> Add User</Button>
      </Form>
      </Segment>
      </Grid.Column>
      </Grid.Row>
</Grid>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h2>FirstName: {user.firstname}</h2>
            <h2>LastName: {user.lastname}</h2>
            <h2>Age: {user.age}</h2>
            <Button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </Button>
            <Button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </Button>
          </div>
          
        );
      })}
      </Container>
    </div>
  );
}



export default FirebaseCrud;