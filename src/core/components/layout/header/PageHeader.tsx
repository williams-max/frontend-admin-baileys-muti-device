import { useNavigate } from 'react-router-dom'
import { IPageHeader } from '../../../interfaces/IHeader'

export const PageHeader = ({ label, navigatePage = '' }: IPageHeader) => {
  const navigate = useNavigate()

  return (
        <div className="row">
            <div className="col-12 d-flex">
                {
                    navigatePage.length > 0 &&
                        <i className='bx bx-chevron-left header-icon pr-1 cursor-pointer'
                            onClick={() => navigate(navigatePage)}/>
                }
                <h4 className="font-weight-bold">
                    { label }
                </h4>
            </div>
        </div>
  )
}
