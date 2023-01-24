import { GitCommit as GitCommitIcon, GitBranch as GitBranchIcon, Calendar as CalendarIcon } from '@geist-ui/icons'

import { Text, Spacer, Divider } from '@geist-ui/core';

import './Footer.css';

function getYear() {
    return new Date().getFullYear();
}

const Footer = () => {
    return (
        <>
            <div class="footer">
                <div class="container-noboot">
                    <Divider mb='4'/>
                    <div className="footer-row">
                        <div className="copyright-info">
                            © {getYear()} Stellection
                        </div>
                        <div className='icon-text-wrapper'>
                            <GitCommitIcon inline size={18} className='icon'/>
                            <Spacer inline w={.35} />
                            <Text small className="code-text">a748bc3d</Text>
                            <Spacer inline w={3}/>
                            <GitBranchIcon inline size={18} className='icon'/>
                            <Spacer inline w={.35} />
                            <Text small className="code-text">main</Text>
                            <Spacer inline w={3}/>
                            <CalendarIcon inline size={18} className='icon'/>
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