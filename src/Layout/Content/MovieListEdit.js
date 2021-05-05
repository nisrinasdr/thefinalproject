import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

import './List.css'

import { Layout, Table, Input, Space, Button, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'

import { UserContext } from '../User/UserContext';
import { MovieContext } from './MovieContext';

const { Content } = Layout;

const MovieListEdit = () => {
    const [daftarFilm, setDaftarFilm, , , , ] = useContext(MovieContext)
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
        title: 'Title',
        dataIndex: 'title',
        ...getColumnSearchProps('title'),
        sorter: (a, b) => b.title.localeCompare(a.title),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '300px',
        ellipsis: true,
        sorter: (a, b) => b.description.localeCompare(a.description),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        width: '100px',
        ellipsis: true,
        sorter: (a, b) => b.duration > a.duration,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Genre',
        dataIndex: 'genre',
        filters: [
          {
            text: 'Animation',
            value: 'Animation',
          },
          {
            text: 'Action',
            value: 'Action',
          },
          {
            text: 'Adventure',
            value: 'Adventure',
          },
          {
            text: 'Comedy',
            value: 'Comedy',
          },
          {
            text: 'Drama',
            value: 'Drama',
          },
          {
            text: 'Fantasy',
            value: 'Fantasy',
          },
          {
            text: 'Horror',
            value: 'Horror',
          },
          {
            text: 'Romance',
            value: 'Romance',
          },
          {
            text: 'Sci-fi',
            value: 'Sci-fi',
          },
          {
            text: 'Thriller',
            value: 'Thriller',
          },
          {
            text: 'War',
            value: 'War',
          },
        ],
        onFilter: (value, record) => record.genre.indexOf(value) === 0,
        sorter: (a, b) => b.genre.localeCompare(a.genre),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Review',
        dataIndex: 'review',
        width: '30ch',
        ellipsis: true,
        sorter: (a, b) => b.review.localeCompare(a.review),
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        width: '100px',
        sorter: (a, b) => b.rating > a.rating,
        sortDirections: ['ascend', 'descend'],
      },
      {
        title: 'Year',
        dataIndex: 'year',
        width: '100px',
        sorter: (a, b) => b.year > a.year,
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
        
        render: (text, record) => (
          <>
          <Link to={`/movie-edit/${record.id}`} >
          <button style={{marginRight:'1em'}} >
            <EditOutlined style={{color: 'black'}}/>
          </button>
          </Link>

          <Popconfirm 
            placement="topLeft" 
            title={"Are you sure to delete this movie?"} 
            onConfirm={
              () => {
                axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${record.id}`, config)
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
        <h1 style={{textAlign: 'center', margin: '1rem'}}>Movie List</h1>
        <Table columns={columns} dataSource={daftarFilm} onChange={onChange} scroll={{ x: 1500 }} />
      </Content>   
    </Layout>
  </>)
}
        

export default MovieListEdit
