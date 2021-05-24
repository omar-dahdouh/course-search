import queryString from 'querystring';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { GridView } from '../components';

import { Input, Row, Col, TreeSelect, Pagination, Spin, Alert } from 'antd';

function getQueryParams() {
  return queryString.parse(window.location.search.slice(1));
}

function catalogRender(nodes = []) {
  return nodes.map(({ id, name, sub = [] }) => (
    <TreeSelect.TreeNode key={id} value={id} title={name}>
      {catalogRender(sub)}
    </TreeSelect.TreeNode>
  ));
}

function SearchPage() {
  const [firstRender, setFirstRender] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [catalog, setCatalog] = useState([{ id: 0, name: 'all categories' }]);
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    const {
      query = '',
      category = 0,
      page = 1,
      pageSize = 12,
    } = getQueryParams();
    setSearchInput(query);
    setSearchQuery(query);
    setCategory(+category);
    setPage(+page);
    setPageSize(+pageSize);
    setFirstRender(false);

    axios.get(`/api/v1/getCatalog`).then((res) => {
      setCatalog([
        {
          id: 0,
          name: 'all categories',
          sub: res.data,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    if (!firstRender) {
      // update history
      const params = {};
      if (searchQuery !== '') params.query = searchQuery;
      if (category !== 0) params.category = category;
      if (page !== 1) params.page = page;
      if (pageSize !== 12) params.pageSize = pageSize;

      const queryParams = queryString.stringify(params);
      history.replace(`/search?${queryParams}`);

      // fetch data
      axios
        .post(`/api/v1/search`, {
          query: searchQuery,
          category,
          offset: (page - 1) * pageSize,
          limit: pageSize,
        })
        .then(({ data }) => {
          if (data.query === searchQuery) {
            setCourses(data.results);
            setTotal(data.count);
          }
          setIsLoading(false);
          setErrorMessage('');
        })
        .catch(({ message }) => {
          setIsLoading(false);
          setErrorMessage(message);
        });
    }
  }, [searchQuery, category, page, pageSize, firstRender, history]);

  function onSearchInputChange({ target }) {
    setSearchInput(target.value);
  }

  function onSearch() {
    setSearchQuery(searchInput);
    setPage(1);
  }

  function onCategoryChange(id) {
    setCategory(id);
    setPage(1);
  }

  function onClick(id) {
    history.push(`/details/${id}`);
  }

  return (
    <div className="page-content">
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Input.Search
            value={searchInput}
            onSearch={onSearch}
            onChange={onSearchInputChange}
            className="search-input"
            placeholder="input search text"
            enterButton
          />
        </Col>
        <Col xs={24} sm={12}>
          <TreeSelect
            value={category}
            onChange={onCategoryChange}
            className="tree-select"
            showSearch
          >
            {catalogRender(catalog)}
          </TreeSelect>
        </Col>
      </Row>
      {isLoading && (
        <Spin tip="Loading...">
          <Alert
            message="Fetching data"
            description="please wait."
            type="info"
            showIcon
          />
        </Spin>
      )}
      {errorMessage && (
        <Alert
          message="Error"
          description={errorMessage}
          type="error"
          showIcon
        />
      )}
      <br />

      {!isLoading && !errorMessage && (
        <>
          <GridView courses={courses} onClick={onClick} />
          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            showTotal={(total) => `Total ${total} items`}
            showSizeChanger={true}
            pageSizeOptions={[6, 12, 24, 50, 100]}
            showQuickJumper
            responsive
            onChange={setPage}
            onShowSizeChange={(cur, size) => {
              setPageSize(size);
            }}
          />
        </>
      )}
    </div>
  );
}

export default SearchPage;
