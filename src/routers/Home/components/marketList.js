import React from 'react'
import star1 from '../images/star1.png'
import star2 from '../images/star2.png'

function collect() {
  dataUSDT[0].star = false
  console.log(dataUSDT[0])
}

export const columnsUSDT = [
  {
    title: '',
    dataIndex: 'star',
    render: text => <img style={{ cursor: 'pointer' }} src={ text ? star1 : star2 } alt="" />,
    align: 'center'
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs',
    align: 'center'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice',
    align: 'center'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    align: 'center',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice',
    defaultSortOrder: 'descend',
    align: 'center'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice',
    align: 'center'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume',
    align: 'center'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    align: 'center',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataUSDT = [
  {
    key: '1',
    star: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000000',
    highsAndLows: '0.00%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000006 BTC'
  },
  {
    key: '2',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000004 BTC'
  },
  {
    key: '3',
    star: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000199 BTC'
  },
  {
    key: '4',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '-8.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00002305 BTC'
  },
  {
    key: '5',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00099999 BTC'
  },
  {
    key: '6',
    star: true,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '-6.01%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000053 BTC'
  }
]

export const columnsBTC = [
  {
    title: '',
    dataIndex: 'star',
    render: text => <img src={ text ? star1 : star2 } alt=""/>
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataBTC = [
  {
    key: '1',
    star: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000005',
    highsAndLows: '0.00%',
    highestPrice: '0.00000005',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '2',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '3',
    star: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '4',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '5',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  }
]

export const columnsETH = [
  {
    title: '',
    dataIndex: 'star',
    render: text => <img src={ text ? star1 : star2 } alt=""/>
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataETH= [
  {
    key: '1',
    star: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000000',
    highsAndLows: '0.00%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '2',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '3',
    star: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '4',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '5',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  }
]

export const columnsBCT = [
  {
    title: '',
    dataIndex: 'star',
    render: text => <img src={ text ? star1 : star2 } alt=""/>
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataBCT = [
  {
    key: '1',
    star: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000000',
    highsAndLows: '0.00%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '2',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '3',
    star: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '4',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '5',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  }
]

export const columnsFree = [
  {
    title: '',
    dataIndex: 'star',
    render: text => <img src={ text ? star1 : star2 } alt=""/>
  },
  {
    title: '交易对',
    dataIndex: 'exchangePairs'
  },
  {
    title: '最新价',
    dataIndex: 'newPrice'
  },
  {
    title: '日涨跌',
    dataIndex: 'highsAndLows',
    render: text => <td style={{ display: 'block', width: '100%', textAlign: 'center', color: `${ text[0] === '-' ? '#e95454' : '#29bc89' }` }}>{ text }</td>
  },
  {
    title: '最高价',
    dataIndex: 'highestPrice'
  },
  {
    title: '最低价',
    dataIndex: 'minimumPrice'
  },
  {
    title: '日成交量',
    dataIndex: 'dailyVolume'
  },
  {
    title: '日成交额',
    dataIndex: 'dailyTurnover',
    sorter: (a, b) => {
      return parseFloat(a.dailyTurnover) - parseFloat(b.dailyTurnover)
    }
  }
]

export const dataFree = [
  {
    key: '1',
    star: true,
    exchangePairs: 'WINGS/USDT',
    newPrice: '0.00000000',
    highsAndLows: '0.00%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 WINGS',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '2',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '3',
    star: true,
    exchangePairs: 'DCR/USDT',
    newPrice: '0.00000000',
    highsAndLows: '+12.10%',
    highestPrice: '0.00000000',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 DCR',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '4',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  },
  {
    key: '5',
    star: false,
    exchangePairs: 'CTXC/USDT',
    newPrice: '0.00000001',
    highsAndLows: '+7.51%',
    highestPrice: '0.00000001',
    minimumPrice: '0.00000000',
    dailyVolume: '0.00000000 CTXC',
    dailyTurnover: '0.00000000 BTC'
  }
]