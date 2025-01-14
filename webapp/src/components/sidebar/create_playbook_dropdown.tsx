import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import {useIntl} from 'react-intl';
import {getMyTeams} from 'mattermost-redux/selectors/entities/teams';
import {ImportIcon, PlayBoxMultipleOutlineIcon, PlusIcon, GlobeIcon} from '@mattermost/compass-icons/components';

import {displayPlaybookCreateModal} from 'src/actions';
import {useImportPlaybook} from 'src/components/backstage/import_playbook';
import {navigateToPluginUrl} from 'src/browser_routing';

import Menu from '../widgets/menu/menu';
import MenuItem from '../widgets/menu/menu_item';
import MenuGroup from '../widgets/menu/menu_group';
import MenuWrapper from '../widgets/menu/menu_wrapper';

import {OVERLAY_DELAY} from 'src/constants';
import {useCanCreatePlaybooksOnAnyTeam} from 'src/hooks';

interface CreatePlaybookDropdownProps {
    team_id: string;
}

const CreatePlaybookDropdown = (props: CreatePlaybookDropdownProps) => {
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const teams = useSelector(getMyTeams);
    const canCreatePlaybooks = useCanCreatePlaybooksOnAnyTeam();

    const [fileInputRef, inputImportPlaybook] = useImportPlaybook(props.team_id || teams[0].id, (id: string) => navigateToPluginUrl(`/playbooks/${id}/outline`));

    const tooltip = (
        <Tooltip id={'create_playbook_dropdown_tooltip'}>
            {formatMessage({defaultMessage: 'Browse or create Playbooks and Runs'})}
        </Tooltip>
    );

    const renderDropdownItems = () => {
        const browsePlaybooks = (
            <MenuItem
                id='browsePlaybooks'
                show={true}
                onClick={() => {
                    navigateToPluginUrl('/playbooks');
                }}
                icon={<IconWrapper><GlobeIcon size={18}/></IconWrapper>}
                text={formatMessage({defaultMessage: 'Browse Playbooks'})}
            />
        );

        const createPlaybook = (
            <MenuItem
                id='createPlaybook'
                show={true}
                onClick={() => dispatch(displayPlaybookCreateModal({}))}
                icon={<IconWrapper><PlusIcon size={18}/></IconWrapper>}
                text={formatMessage({defaultMessage: 'Create New Playbook'})}
            />
        );

        const importPlaybook = (
            <>
                <MenuItem
                    id='importPlaybook'
                    show={true}
                    onClick={() => {
                        fileInputRef?.current?.click();
                    }}
                    icon={
                        <IconWrapper><ImportIcon size={18}/></IconWrapper>
                    }
                    text={formatMessage({defaultMessage: 'Import Playbook'})}
                />
            </>
        );

        const browseRuns = (
            <MenuItem
                id='browseRuns'
                show={true}
                onClick={() => {
                    navigateToPluginUrl('/runs');
                }}
                icon={
                    <IconWrapper><PlayBoxMultipleOutlineIcon size={18}/></IconWrapper>
                }
                text={formatMessage({defaultMessage: 'Browse Runs'})}
            />
        );

        return (
            <>
                <MenuGroup noDivider={true}>
                    {browsePlaybooks}
                    {canCreatePlaybooks && createPlaybook}
                    {importPlaybook}
                </MenuGroup>
                <MenuGroup>
                    {browseRuns}
                </MenuGroup>
            </>
        );
    };

    return (
        <Dropdown>
            <OverlayTrigger
                delay={OVERLAY_DELAY}
                placement='top'
                overlay={tooltip}
            >
                <>
                    <Button aria-label={formatMessage({defaultMessage: 'Create Playbook Dropdown'})}>
                        <PlusIcon size={18}/>
                    </Button>
                    {inputImportPlaybook}
                </>
            </OverlayTrigger>
            <Menu
                id='CreatePlaybookDropdown'
                ariaLabel={formatMessage({defaultMessage: 'Create Playbook Dropdown'})}
            >
                {renderDropdownItems()}
            </Menu>
        </Dropdown>
    );
};

export default CreatePlaybookDropdown;

const Dropdown = styled(MenuWrapper)`
    position: relative;
    height: 30px;
`;

const Button = styled.button`
    border-radius: 16px;
    font-size: 18px;

    background-color: rgba(var(--sidebar-text-rgb), 0.08);
    color: rgba(var(--sidebar-text-rgb), 0.72);

    z-index: 1;
    padding: 0;
    border: none;
    background: transparent;

    &:hover:not(.active) {
        background: rgba(var(--sidebar-text-rgb), 0.16);
        color: var(--sidebar-text);
    }

    min-width: 28px;
    height: 28px;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    display: inline-flex;

    &.disabled {
        background: rgba(255, 255, 255, 0.08);
    }
`;

const IconWrapper = styled.div`
    margin-right: 7px;
    margin-left: 4px;
    display: flex;
    justify-items: center;
`;
