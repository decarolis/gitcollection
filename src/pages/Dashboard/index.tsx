import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiTrash2 } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

// api
import { api } from '../../services/api';

// styled-components
import { Title, Form, Repos, Error, Success } from './styles';

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const Dashboard: React.FC = () => {
  const [repos, setRepos] = React.useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection:repositories');
    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    return [];
  });
  const [newRepo, setNewRepo] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const [inputSuccess, setInputSuccess] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
  }, [repos]);

  const handleRmRepo = (repoName: string) => {
    for (let i = 0; i < repos.length; i++) {
      const repositories = JSON.parse(JSON.stringify(repos));
      if (repositories[i].full_name === repoName) {
        repositories.splice(i, 1);
        setRepos(repositories);
      }
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setNewRepo(event.target.value);
  };

  const handleAddRepo = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    if (!newRepo) {
      (() => {
        setInputError('Enter: username/repository');
        setTimeout(() => {
          setInputError('');
        }, 3000);
      })();
      return;
    }

    for (let i = 0; i < repos.length; i++) {
      if (repos[i].full_name === newRepo) {
        (() => {
          setInputError('Repository already exists in your list');
          setTimeout(() => {
            setInputError('');
          }, 3000);
        })();
        return;
      }
    }

    try {
      const response = await api.get<GithubRepository>(`/repos/${newRepo}`);
      const repository = response.data;
      setRepos([repository, ...repos]);
      setNewRepo('');
      setInputError('');
      (() => {
        setInputSuccess('Repository has been successfully added');
        setTimeout(() => {
          setInputSuccess('');
        }, 3000);
      })();
    } catch (e) {
      setInputSuccess('');
      (() => {
        setInputError('Repository not found on GitHub');
        setTimeout(() => {
          setInputError('');
        }, 3000);
      })();
    }
  };

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>GitHub Repository Catalog</Title>
      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input
          type="text"
          placeholder="username/repository_name"
          onChange={handleInputChange}
          value={newRepo}
        />
        <button type="submit">Search</button>
      </Form>

      {!inputSuccess && !inputError && <Success>&nbsp;</Success>}
      {inputError && <Error>{inputError}</Error>}
      {inputSuccess && <Success>{inputSuccess}</Success>}

      <Repos>
        {repos.map(repository => (
          <div key={repository.full_name}>
            <Link to={`/repositories/${repository.full_name}`}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
            <FiTrash2
              size={20}
              onClick={() => handleRmRepo(repository.full_name)}
            />
          </div>
        ))}
      </Repos>
    </>
  );
};
