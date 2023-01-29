import { GitCommit as GitCommitIcon, GitBranch as GitBranchIcon, Calendar as CalendarIcon } from '@geist-ui/icons'
import { Text, Spacer, Divider, Tooltip } from '@geist-ui/core';
import GitInfo from 'react-git-info/macro';
import dateFormat from 'dateformat';

import './Footer.css';

function getYear() {
    return new Date().getFullYear();
}

const Footer = (props) => {
    const gitInfo = GitInfo();
    let time = new Date(gitInfo.commit.date);

    let shortTime = dateFormat(time, "hh:MMTT dd/mm/yy Z");
    let longTime = dateFormat(time, "dddd, mmmm dS, yyyy, h:MM:ss TT Z");
    // console.log(time);
    // let datetimeString2 = time.getHours() + ":" + time.getMinutes() + " " + time.getDay() + "/" + time.getMonth() + "/" + time.getFullYear();
    // let datetimeString = time.toTimeString() + " " + time.toDateString();

    return (
        <>
            <div className="footer">
                <div className={"" + (props.wide ? "container-wide" : "container-regular")}>
                    <Divider mb='4'/>
                    <div className="footer-row">
                        <div className="copyright-info">
                            © {getYear()} Stellection
                        </div>
                        <div class="github-info-column">
                            
                            <div className='icon-text-wrapper'>
                                <Tooltip text={gitInfo.commit.message} type="dark" placement="top" leaveDelay={50}>
                                    <GitCommitIcon size={20} className='icon'/>
                                    <Spacer inline w={.35} />
                                    <Text small>{gitInfo.commit.shortHash}</Text>
                                    <Spacer inline w={1.5}/>
                                    <GitBranchIcon size={20} className='icon'/>
                                    <Spacer inline w={.35} />
                                    <Text small>{gitInfo.branch}</Text>
                                </Tooltip>
                                <Spacer inline w={1.5}/>
                                <Tooltip text={longTime} type="dark" placement="top" leaveDelay={50}>
                                    <CalendarIcon size={20} className='icon'/>
                                    <Spacer inline w={.35} />
                                    <Text small className="">{shortTime}</Text>
                                </Tooltip>
                            </div>
                            
                            
                        </div>
                        
                    </div>
                    
                    
                </div>
            </div>
            
        </>
    );
}

export default Footer;