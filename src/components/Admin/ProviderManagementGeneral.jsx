import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './ProviderManagementGeneral.css';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function ProviderManagementGeneral() {

    const dispatch = useDispatch();
    const history = useHistory();

    const providers = useSelector(store => store.providers);

    // material-ui
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    function generate(element) {
        return providers?.map((provider) =>
            React.cloneElement(element, {
                key: provider?.provider_id,
            }),
        );
    }

    useEffect(() => {
        dispatch({ type: 'GET_PROVIDERS' });
    }, []);

    console.log('Provider Mgmt Gen providers:', providers);

    const handleSelect = (providerId) => {

        console.log('Provider Mgmt Gen provider id: ', providerId);

        dispatch({
            type: 'SELECT_PROVIDER',
            payload: providerId
        })
        history.push(`/providermgmt/${providerId}`);
    } // end handleSelect

    const verifiedProviders = providers.filter(provider => provider.verified === true)
    const unVerifiedProviders = providers.filter(provider => provider.verified === false)

    //    onClick={() => handleSelect(provider?.user_id)}

    let star = (<StarIcon />);

    if (providers?.verified === 'true') {
        star = (<StarIcon />);
    }

    return (

        <div>

            <h1 className="providerMgmtListTitle">PROVIDERS</h1>

            <div className={classes.root}>

                <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {generate(
                                <div>
                                    {providers?.map(provider => {
                                        return(
                                            <ListItem key={provider?.provider_id}>
                                    <ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={provider?.firstName}
                                    >
                                    </ListItemText>
                                </ListItem>
                                        )
                                    })}
                                </div>
                            )}
                        </List>
                    </div>
                </Grid>

            </div>

        </div >

    )

} // end ProviderManagementGeneral

export default ProviderManagementGeneral;