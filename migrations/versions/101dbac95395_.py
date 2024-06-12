"""empty message

Revision ID: 101dbac95395
Revises: 7b4c52ac832f
Create Date: 2024-06-11 10:43:30.389932

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '101dbac95395'
down_revision = '7b4c52ac832f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('is_admin',
               existing_type=sa.BOOLEAN(),
               nullable=False)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('is_admin',
               existing_type=sa.BOOLEAN(),
               nullable=True)

    # ### end Alembic commands ###