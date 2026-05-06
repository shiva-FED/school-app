import { useAdmin } from "../../context/AdminContext";

export default function Overview() {
  const { users, updateUser, fetchData } = useAdmin();

  const handleDrop = async (e: any, teacherId: string) => {
    const studentId = e.dataTransfer.getData("studentId");

    await updateUser(studentId, { teacherId });
    fetchData();
  };

  const userMap = users.reduce((acc: any, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  return (
    <>
      <h3>Overview</h3>

      {users
        .filter((u) => u.role === "teacher")
        .map((teacher) => {
          const teacherStudents = users.filter(
            (s) => s.role === "student" && s.teacherId === teacher.id,
          );

          return (
            <div
              key={teacher.id}
              className="card card-section"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                e.currentTarget.style.background = "white";
              }}
              onDrop={(e) => handleDrop(e, teacher.id)}
            >
              <div>
                <h4 style={{ marginTop: "10px" }}>Teacher:</h4>
                <div className="card teacher-card">
                  <div>{teacher?.name}</div>
                  <small>{teacher?.email}</small>
                </div>
              </div>

              <div>
                <h4 style={{ marginTop: "10px" }}>Students:</h4>
                <div className="grid">
                  {teacherStudents.map((student) => {
                    const userData = userMap[student.id];
                    return (
                      <div
                        key={student.id}
                        className="card"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("studentId", student.id);
                          e.currentTarget.style.opacity = "0.5";
                        }}
                        onDragEnd={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                      >
                        <div>{userData?.name}</div>
                        <small>{userData?.email}</small>
                      </div>
                    );
                  })}
                  {teacherStudents.length === 0 && <p>No students assigned</p>}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
