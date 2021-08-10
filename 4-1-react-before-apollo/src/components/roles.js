import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './components.css';

const GET_ROLES = gql`
    query GetRoles {
        roles {
            id
        }
    }
`

const GET_ROLE = gql`
    query GetRole($id: ID!) {
        role(id: $id) {
            id
            requirement
            members {
                id
                last_name
                serve_years
            }
            equipments {
                id
            }
            softwares {
                id
            }
        }
    }
`;



function Roles() {
    const [contentId, setContentId] = useState("");

    const AsideItems = () =>  {
        const roleIcons = {
            developer: '💻',
            designer: '🎨',
            planner: '📝'
        }
        const { loading, error, data } = useQuery(GET_ROLES);
        // 여기는 usePagination처럼 useEffect로 비동기처리 안해줘도 되나보네?
        // useQuery에서 알아서 해주는 것 같다.
        if (loading) return <p className="loading">Loading...</p>
        if (error) return <p className="Error">Error</p>
        return (
            <ul>
                {data.roles.map( ({id}) => (
                    <li key={id} 
                    className={"roleItem" + (contentId === id ? "on" : "")}
                    onClick={() => setContentId(id)}>
                        <span>{contentId === id ? '🔲' : '⬛'}</span>
                        {roleIcons[id]} {id}
                    </li>
                ))}
            </ul>
        );
    }
    

    const MainContents = () =>  {
        const { loading, error, data } = useQuery(GET_ROLE, {
            variables: {id: contentId}
        })
        if (loading) return <p className='loading'>Loading...</p>
        if (error) return <p className='error'>Error...</p>
        if (contentId === "") return (<div className="roleWrapper">Select Role</div>)

        return (
        <div className="roleWrapper">
            <h2>{data.role.id}</h2>
            <div className="requirement">
                <span>{data.role.requirement}</span>
                {'\u00A0'}required
            </div>
            <h3>Members</h3>
            <ul>
                {data.role.members.map( member => (
                    <li>{member.last_name}</li>
                ))}
            </ul>
            <h3>Equipments</h3>
            <ul>
                {data.role.equipments.map( equipment => (
                    <li>{equipment.id}</li>
                ))}
            </ul>
            <h3>Softwares</h3>
            <ul>
                {data.role.softwares.map( software => (
                    <li>{software.id}</li>
                ))}
            </ul>
        </div>);
    }

    return (
        <div id="roles" className="component">
            <aside>
                {AsideItems()}
            </aside>
            <section className="contents">
                {MainContents()}
            </section>
        </div>
    )
}

export default Roles;
