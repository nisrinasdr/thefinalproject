import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

import './List.css'

import { Layout, Table, Input, Space, Button, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'

import { UserContext } from '../User/UserContext';
import { GameContext } from './GameContext';

const { Content } = Layout;

const GameListEdit = () => {
    const [daftarFilm, setDaftarFilm, , ] = useContext(GameContext)
    const [user,] = useContext(UserContext)
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }

    const [state, setState] = useState({
      searchText: '',
      searchedColumn: '',
    });

    let searchInput = ''
    //Search on table
    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: text =>
        state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    const handleReset = clearFilters => {
      clearFilters();
      setState({ searchText: '' });
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        ...getColumnSearchProps('name'),
        sorter: (a, b) => b.name.localeCompare(a.name),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Release Year',
        dataIndex: 'release',
        key: 'release',
        width: '150px',
        sorter: (a, b) => b.release.localeCompare(a.release),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Platform',
        dataIndex: 'platform',
        sorter: (a, b) => b.platform > a.platform,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Genre',
        dataIndex: 'genre',
        sorter: (a, b) => b.genre.localeCompare(a.genre),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Single Player',
        dataIndex: 'singlePlayer',
        width: '150px',
        filters: [
          {
            text: 'true',
            value: 'true',
          },
          {
            text: 'false',
            value: 'false',
          },
        ],
        onFilter: (value, record) => record.genre.indexOf(value) === 0,
        sorter: (a, b) => b.singlePlayer.localeCompare(a.singlePlayer),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Multi Player',
        dataIndex: 'multiplayer',
        width: '150px',
        filters: [
          {
            text: 'true',
            value: 'true',
          },
          {
            text: 'false',
            value: 'false',
          },
        ],
        onFilter: (value, record) => record.genre.indexOf(value) === 0,
        sorter: (a, b) => b.multiplayer > a.multiplayer,
        sortDirections: ['ascend', 'descend'],
      },
      
      {
        title: 'Image URL',
        dataIndex: 'image_url',
        ellipsis: true,
      },
      {
        title: 'Action',
        dataIndex: 'id',
        width: '150px',
        
        render: (text, record) => (
          <>
          <Link to={`/game-edit/${record.id}`} >
          <button style={{marginRight:'1em'}} >
            <EditOutlined style={{color: 'black'}}/>
          </button>
          </Link>

          <Popconfirm 
            placement="topLeft" 
            title={"Are you sure to delete this game?"} 
            onConfirm={
              () => {
                axios.delete(`https://backendexample.sanbersy.com/api/data-game/${record.id}`, config)
                  .then(() => {
                    let daftarFilmBaru = daftarFilm.filter(el => {return el.id !== record.id})
                    setDaftarFilm([...daftarFilmBaru])
                  })}
            } 
            okText="Yes" cancelText="No">
              <button>
                <DeleteOutlined />
              </button>
            </Popconfirm>
          
        </>
         ),
      }
    ];


  
  
    
    function onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
    }

return(
  <>
    <Layout className="site-layout-background" >
      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <h1 style={{textAlign: 'center', margin: '1rem'}}>Game List</h1>
        <Table columns={columns} dataSource={daftarFilm} onChange={onChange} scroll={{ x: 1500 }} />
      </Content>   
    </Layout>
  </>)
}
        

export default GameListEdit
