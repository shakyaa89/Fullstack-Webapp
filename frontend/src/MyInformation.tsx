import "./index.css";

const MyInformation = ({
  id,
  name,
  email,
}: {
  id: number;
  name: string;
  email?: string;
}) => {
  return (
    <div>
      <h1>My Information</h1>
      <p>ID : {id}</p>
      <p>Name : {name}</p>
      {email ? <p>Email : {email}</p> : null}
    </div>
  );
};

export default MyInformation;
