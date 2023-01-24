import { GitCommit as GitCommitIcon, GitBranch as GitBranchIcon, Calendar as CalendarIcon } from '@geist-ui/icons'

import { Text, Spacer, Divider } from '@geist-ui/core';

import './Footer.css';

function getYear() {
    return new Date().getFullYear();
}

const Footer = (props) => {
    return (
        <>
            <div className="footer">
                <div className={"" + (props.wide ? "container-wide" : "container-regular")}>
                    <Divider mb='4'/>
                    <div className="footer-row">
                        <div className="copyright-info">
                            © {getYear()} Stellection
                        </div>
                        <div className='icon-text-wrapper'>
                            <GitCommitIcon size={18} className='icon'/>
                            <Spacer inline w={.35} />
                            <Text small className="code-text">a748bc3d</Text>
                            <Spacer inline w={3}/>
                            <GitBranchIcon size={18} className='icon'/>
                            <Spacer inline w={.35} />
                            <Text small className="code-text">main</Text>
                            <Spacer inline w={3}/>
                            <CalendarIcon size={18} className='icon'/>
                            <Spacer inline w={.35} />
                            <Text small className="">13 minutes ago</Text>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            
        </>
    );
}

export default Footer;