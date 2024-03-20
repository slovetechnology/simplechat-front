import Swal from 'sweetalert2'

export const Alert = (title,text, icon) => {
    return Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false,
    })
}

export const CookieName = 'simplechatfront15678@$'

export const UserRole = [
    {
        role: 'user',
        url: '/dashboard'
    },
    {
        role: 'admin',
        url: '/admin-controls'
    },
]