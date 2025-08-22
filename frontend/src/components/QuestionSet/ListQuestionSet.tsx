import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/questions/set/list",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setQuestionSet(response?.data?.questionSet);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p className="text-center text-white mt-10">Loading...</p>;
  }

  if (questionSets.length === 0) {
    return (
      <p className="text-center text-white mt-10">No question sets found.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold text-white mb-6">
        My Question Sets
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {questionSets.map((question) => {
          const takeQuizHandler = () => {
            navigate(`/questionset/${question._id}/attempt`);
          };
          return (
            <div
              key={question._id}
              className="bg-white/10 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {question.title}
                </h3>
                <p className="text-white/80">
                  {question.questionCount} questions
                </p>
              </div>
              <button
                onClick={takeQuizHandler}
                className="mt-4 bg-[#3E5641] hover:bg-[#2d3f30] text-white px-4 py-2 rounded-md shadow-md transition text-center cursor-pointer"
              >
                Take Quiz
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListQuestionSet;
