import './components.css';
import { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TEAMS = gql`
    query GetTeams {
        teams {
            id
            manager
            members {
                id
                first_name
                last_name
                role
            }
        }
    }
`
const GET_TEAM = gql`
    query GetTeam($id: ID!) {
        team(id: $id) {
            id
            manager
            office
            extension_number
            mascot
            cleaning_duty
            project
        }
    }
`;

function Teams() {
    const [contentId, setContentId] = useState(0);
    const [inputs, setInputs] = useState({
        manager: '',
        office: '',
        extension_number: '',
        mascot: '',
        cleaning_duty: '',
        projects: ''
    });
    
    const AsideItems = () => {
        const roleIcons = {
            developer: '💻',
            designer: '🎨',
            planner: '📝'
        }
        const { loading, error, data, refetch } = useQuery(GET_TEAMS);
        if (loading) return <p className="loading">Loading...</p>
        if (error) return <p className="Error">Error</p>

        return (
        <ul>
            {data.teams.map( ({id, manager, members}) => {
                return (
                    <id key={id}>
                        <span className="teamItemTitle"
                        onClick={() => setContentId(id)}>
                            Team {id} : {manager}'s
                        </span>
                        <ul className="teamMembers">
                            {members.map( ({id, first_name, last_name, role}) => (
                                <li key={id}>
                                    {roleIcons[role]} {first_name} {last_name}
                                </li>
                            ))}
                        </ul>
                    </id>
                )
            })}
        </ul>);
    }

    const MainContents = () => {
        const { loading, error } = useQuery(GET_TEAM, {
            variables: {id: contentId},
            onCompleted: (data) => {
                if (contentId === 0) {
                    setInputs({
                        manager: '',
                        office: '',
                        extension_number: '',
                        mascot: '',
                        cleaning_duty: '',
                        projects: ''
                    })
                } else {
                    setInputs({
                        manager: data.team.manager,
                        office: data.team.office,
                        extension_number: data.team.extension_number,
                        mascot: data.team.mascot,
                        cleaning_duty: data.team.cleaning_duty,
                        projects: data.team.projects
                    })
                }
            }
        })
        if (loading) return <p className="loading">Loading...</p>
        if (error) return <p className="Error">Error</p>

        return (<div></div>);
    }

    return (
        <div id="teams" className="component">
            <aside>
                {AsideItems()}
            </aside>
            <section className="contents">
                {MainContents()}
            </section>
        </div>
    )
}

export default Teams;