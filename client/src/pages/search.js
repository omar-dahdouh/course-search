import queryString from 'querystring';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { GridView } from '../components';
import { catId, catName, catDefault } from '../assets/providers';

import {
  Input,
  Row,
  Col,
  TreeSelect,
  Pagination,
  Spin,
  Alert,
  Checkbox,
  Select,
  DatePicker,
  Space,
  Divider,
  Slider,
  Button,
} from 'antd';

const { Option } = Select;

function getQueryParams() {
  return queryString.parse(window.location.search.slice(1));
}

function catalogRender(nodes = []) {
  return nodes.map(({ id, name, sub = [], selectable }) => (
    <TreeSelect.TreeNode
      key={id}
      value={id}
      title={name}
      selectable={selectable}
    >
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
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [inTitle, setInTitle] = useState(true);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [maxDate, setMaxDate] = useState(0);

  const [providers, setProviders] = useState(catDefault);

  const history = useHistory();

  function resetAll() {
    setSearchInput('');
    setSearchQuery('');
    setPage(1);
    setPageSize(12);
    setCategory(0);
    setInTitle(true);
    setRatingRange([0, 5]);
    setMaxDate(0);
    setProviders(catDefault);
  }

  useEffect(() => {
    const {
      query = '',
      category = 0,
      page = 1,
      pageSize = 12,
      inTitle = true,
      maxDate = 0,
      ratingRange = false,
      providers = '[1,148,203,235,245]',
    } = getQueryParams();
    setSearchInput(query);
    setSearchQuery(query);
    setCategory(+category);
    setPage(+page);
    setPageSize(+pageSize);
    setFirstRender(false);
    setInTitle(inTitle !== 'false');
    setMaxDate(maxDate === 0 ? 0 : moment(+maxDate));
    setRatingRange(JSON.parse(ratingRange) || [0, 5]);

    const prov = JSON.parse(providers)
      .map((id) => catName[id])
      .reduce(
        (obj, key) => {
          obj[key] = true;
          return obj;
        },
        {
          udemy: false,
          coursera: false,
          edx: false,
          alison: false,
          futurelearn: false,
        }
      );
    console.log({ prov });

    setProviders(prov);

    axios.get(`/api/v1/getCatalog`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    const cats = categories
      .filter(({ name }) => providers[name])
      .map((props) => {
        return { ...props, selectable: false };
      });

    setCatalog([{ id: 0, name: 'all categories' }, ...cats]);
  }, [providers, categories]);

  useEffect(() => {
    if (!firstRender) {
      // update history
      const params = {};
      if (searchQuery !== '') params.query = searchQuery;
      if (category !== 0) params.category = category;
      if (page !== 1) params.page = page;
      if (pageSize !== 12) params.pageSize = pageSize;
      if (inTitle !== true) params.inTitle = inTitle;
      if (maxDate !== 0) params.maxDate = +maxDate;

      const textRange = JSON.stringify(ratingRange);
      const textProviders = JSON.stringify(
        Object.keys(providers)
          .filter((name) => providers[name])
          .map((k) => catId[k])
      );

      if (textRange !== '[0,5]') params.ratingRange = textRange;
      if (textProviders !== '[1,148,203,235,245]')
        params.providers = textProviders;

      const queryParams = queryString.stringify(params);
      history.replace(`/search?${queryParams}`);

      // fetch data
      axios
        .post(`/api/v1/search`, {
          query: searchQuery,
          category,
          offset: (page - 1) * pageSize,
          limit: pageSize,
          maxDate: maxDate || moment(),
          ratingRange,
          providers: Object.keys(providers)
            .filter((name) => providers[name])
            .map((k) => catId[k]),
          inTitle,
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
  }, [
    searchQuery,
    category,
    page,
    pageSize,
    firstRender,
    history,
    maxDate,
    providers,
    ratingRange,
    inTitle,
  ]);

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

  function filterTreeNode(input, { title }) {
    return title.toLowerCase().includes(input.toLowerCase());
  }

  function onProviderChecked({ target }, key) {
    setProviders({
      ...providers,
      [key]: target.checked,
    });
    console.log(providers);
  }

  return (
    <div className="content-padding">
      <Row gutter={32}>
        <Col xs={24} sm={12} md={6} style={{ backgroundColor: '#eee' }}>
          <Divider>search</Divider>
          <Input.Search
            value={searchInput}
            onSearch={onSearch}
            onChange={onSearchInputChange}
            className="search-input"
            placeholder="input search text"
            enterButton
          />
          <Select
            value={inTitle}
            style={{ width: '100%' }}
            onChange={setInTitle}
          >
            <Option value={true} selected>
              search in title
            </Option>
            <Option value={false}>search in description</Option>
          </Select>

          <Divider>provider</Divider>
          <Space direction="vertical">
            <Checkbox
              checked={providers.udemy}
              onChange={(event) => {
                onProviderChecked(event, 'udemy');
              }}
            >
              udemy
            </Checkbox>
            <Checkbox
              checked={providers.coursera}
              onChange={(event) => {
                onProviderChecked(event, 'coursera');
              }}
            >
              coursera
            </Checkbox>
            <Checkbox
              checked={providers.edx}
              onChange={(event) => {
                onProviderChecked(event, 'edx');
              }}
            >
              edx
            </Checkbox>
            <Checkbox
              checked={providers.alison}
              onChange={(event) => {
                onProviderChecked(event, 'alison');
              }}
            >
              alison
            </Checkbox>
            <Checkbox
              checked={providers.futurelearn}
              onChange={(event) => {
                onProviderChecked(event, 'futurelearn');
              }}
            >
              futurelearn
            </Checkbox>
          </Space>
          <Divider>category</Divider>
          <TreeSelect
            value={category}
            // treeCheckable
            // showCheckedStrategy="SHOW_CHILD"
            onChange={onCategoryChange}
            className="tree-select"
            showSearch
            filterTreeNode={filterTreeNode}
          >
            {catalogRender(catalog)}
          </TreeSelect>
          <Divider>rating</Divider>
          <Slider
            range
            min={0}
            max={5}
            step={1}
            marks={{ 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }}
            value={ratingRange}
            onChange={setRatingRange}
          />
          <Divider>date</Divider>
          <DatePicker
            value={maxDate}
            onChange={setMaxDate}
            style={{ width: '100%' }}
          />
          <br />
          <br />
          <Button
            type="primary"
            onClick={() => {
              // history.push('/search');
              resetAll();
            }}
          >
            reset all
          </Button>
          <br />
          <br />
        </Col>
        <Col xs={24} sm={12} md={18}>
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
          {!isLoading && !errorMessage && (
            <>
              <Divider>{`total ${total} results`}</Divider>
              <GridView courses={courses} onClick={onClick} />
              <Pagination
                current={page}
                pageSize={pageSize}
                total={total}
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
        </Col>
      </Row>
    </div>
  );
}

export default SearchPage;
