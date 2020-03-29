import React from 'react'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import { Link } from 'react-router-dom'
import { linkToRecord } from 'ra-core'
import { Loading } from 'react-admin'
import { subsonicUrl } from '../subsonic'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5px'
  },
  cover: {
    display: 'inline-block',
    maxWidth: '100%',
    height: 'auto'
  },
  tileBar: {
    textAlign: 'center',
    background:
      'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)'
  },
  albumArtistName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    fontSize: '1em'
  }
}))

const getColsForWidth = (width) => {
  if (width === 'xs') return 2
  if (width === 'sm') return 3
  if (width === 'md') return 5
  if (width === 'lg') return 6
  return 7
}

const LoadedAlbumGrid = ({ ids, data, basePath, width }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={'auto'}
        cols={getColsForWidth(width)}
        className={classes.gridList}
        spacing={20}
      >
        {ids.map((id) => (
          <GridListTile
            component={Link}
            key={id}
            to={linkToRecord(basePath, data[id].id, 'show')}
          >
            <img
              src={subsonicUrl(
                'getCoverArt',
                data[id].coverArtId || 'not_found',
                { size: 300 }
              )}
              alt={data[id].album}
              className={classes.cover}
            />
            <GridListTileBar
              className={classes.tileBar}
              title={data[id].name}
              subtitle={
                <>
                  <div className={classes.albumArtistName}>
                    {data[id].albumArtist}
                  </div>
                </>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

const AlbumGridView = ({ loading, ...props }) =>
  loading ? <Loading /> : <LoadedAlbumGrid {...props} />

export default withWidth()(AlbumGridView)
