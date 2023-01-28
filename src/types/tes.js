var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjU4ODM0Njg4YWNjOTYzMjMyMzc4NSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3Mjg0MTI5Nn0.T_X0DtszJhthqJK0SR31IoRWXYSYOamMXgc-rOddfmw"
);

var formdata = new FormData();
formdata.append("name", "burger");
formdata.append("typeId", "63b589fcdec93b89e5d1a448");
formdata.append("numberInStock", "30");
formdata.append("price", "300");
formdata.append(
  "file",
  fileInput.files[0],
  "/C:/Users/kalab/Downloads/60423cbdd4f89c8792a1ad3952e74146.jpg"
);

var requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: formdata,
  redirect: "follow",
};

fetch(
  "localhost:5000/api/products/Update/63b82cc16ca0a05e81858e26",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
