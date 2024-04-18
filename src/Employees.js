import {gql, useQuery} from "@apollo/client";

const GET_EMPLOYEES = gql`
{
    nurseVitalSigns(userId:"662154dd5ce16e88cfe0b703")
    {
        userId
        heartRate
    }
}
`
// const GET_EMPLOYEES = gql`
// {
//     user(id:"662154dd5ce16e88cfe0b703")
//     {
//         name
//         email
//     }
// }
// `

export default function Employees()
{

   const {loading, error, data , refetch}  =  useQuery(GET_EMPLOYEES);
   const handleFetch = ()=>{
    refetch();
    console.log(data);
    console.log(data.nurseVitalSigns[0].heartRate);
    console.log(data.heartRate);
   }

   if(loading) return <p>Loading, Please wait</p>
   if(error) return <p>Error</p>

    return (
        <div>
            <p>Hello</p>
            <p>{data.nurseVitalSigns[0].userId}</p>
            {data.nurseVitalSigns[0].heartRate}
            {/* <ul>
            { data.employees.map(employee => 
            <li key={employee._id}>
                <div className="flex justify-between mx-10 my-2">
                    <div>
                    Email: {employee.name} 
                    </div>
                    <div>
                    Name: {employee.email} 
                    </div>
                    <div>
                    Role: {employee.role} 
                    </div>
                    <div>
                    Department: {employee.department} 
                    </div>
                </div>
                </li>
            )}
            </ul> */}
            < button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md" onClick={handleFetch}>Make API Call</button>
        </div>
    )
}